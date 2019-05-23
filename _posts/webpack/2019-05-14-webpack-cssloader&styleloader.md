# CSS-Loader & Style-Loader

## CSS-Loader

像`import/require`一样，解析`@import`和`url`并加载

* 使用、加载顺序：先css-loader 后 style-loader，因此书写顺序先style-loader 后 css-loader
* `url()` 在 option中开启
    ```$xslt
    options:{
        url: true
    }
    ```
* 