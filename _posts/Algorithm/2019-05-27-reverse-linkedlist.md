# 反转链表

tags: 'easy'

## 解题思路

### 非递归

三个指针分别指向前一个节点，当前节点，后面的节点。
将当前的节点的next指针指向前一个节点，然后依次后移。因为后一个节点的获取是在更改next指针之前，因此可以准确的移动
判断跳出的条件为后面节点是否为null。如果为null证明当前节点的后面节点为空，当前节点为最后一个节点。
此时只需要将当前的节点的next指针指向前一个节点即可。

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if(head === null) return head
    let pre = null;
    let cur = head;
    let lat = cur.next;
    while(lat !== null){
        cur.next = pre;
        pre = cur;
        cur = lat;
        lat = lat.next
    }
    cur.next = pre;
    return cur;
};
```
### 递归解法

反转节点的next指向需要解开两个，一个是当前节点的next，另一个是当前节点的下一个的next指针。
因此递归调用函数，知道找到最后一个节点，此时他的下一个节点是null，直接返回最后一个节点，此时最后一个递归结束。

倒数第二个节点的递归，将上一步返回的下一个节点的next指向倒数第二个节点，倒数第二个节点的next置为空，否则，在下一轮的时候会形成环。

```javascript
 /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
var reverseList = function(head) {
    if(head.next === null || head === null){
        return head
    }
    let _next = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return _next;
};
```
