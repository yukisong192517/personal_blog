# 深入响应式原理

## 来自官方文档的解释


Vue将会遍历所有的属性，使用Object.defineProperty将属性全部转换成为getter/setter 。getter和setter是为了追踪依赖，在被访问或者被修改的时候通知变更 

每个组件实例都对应一个watcher实例，会在组件的渲染过程中将接触过的数据属性记为依赖。 

当setter触发的时候，通知watcher，将关联组件进行重新渲染

## 源码中响应式的过程

1. init阶段：将vue实例的data属性变成一个有getter和setter的响应式对象。并且被vue reactive之后的属性都有一个dep对象对应

2. mount阶段：创建watcher，时刻关注着数据的变化。 在数据更新的时候，watcher的run调用，更新了页面。

3. watcher对象的创建，执行了vue的更新函数，触发了get方法，调用`dep
.depend()`


在`defineReactive`函数中，会初始化一个dep对象。在get函数中会通过`dep.depend`做依赖收集。

* 什么是dep？

Dep是对Watcher 的管理。Dep脱离watcher是没有意义的。

* 过程

在`mountComponent`的过程中，会执行updateComponent ,并且初始化一个渲染watcher。
在初始化渲染watcher的过程中会执行`this.get()`。
在`get`函数执行的过程中就生成了渲染Vnode，因此对数据的访问就触发了数据对象的getter。也就会调用`dep.depend`方法进行依赖收集。此时会把
当前的watcher订阅到数据持有的dep的subs。
在依赖手机结束之后会讲Dep.target回复成原本的状态。

### 派发更新

在defineReactive中的setter中：
如果shallow为false，值会变成响应式。
如果shallow为true，会调用dep.notify().通知所有的订阅者。

* 调用dep.notify 会发生什么?
遍历dep.subs数组。对于每个watcher调用update。

* update 函数的调用会发生什么？

会将所有的watcher放到队列中，然后再nextTick批量处理queue。

* 如何处理queue？

queue会先进行排序。（因为创建过程是先父后子，因此，需要保证执行的顺序也是先父后子.）
队列的遍历，对每个watcher执行`watcher.run`
状态的恢复：将watcher队列进行清空。

* watcher.run 
  调用getAndInvoke函数，并且传入watcher的回调函数。通过get获得当前的值，如果新旧的值不相等，则执行watcher的回调。在get中会执行update方法
  因此会触发组件的重新渲染。
  
  
  