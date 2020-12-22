Add animated grain texture effect to your content.
--------------------------------------------------

With **grained.js** you can add customized noise effect on your web page. It has easily customizable options to generate
the animated noise effect. The animation is added using CSS3 key-frame animation and instantly generated png noise
image.

[!["Create your own"](http://sarathsaleem.github.io/grained/img/textute-list.gif)](http://sarathsaleem.github.io/grained)

**[Create your own](http://sarathsaleem.github.io/grained)**

## Setup

### Classic

Include the library file in your html page.

```html

<script src="grained.js"></script>
```

### ES Modules

```javascript
import grained from 'grained.esm.js'
```

## How to use

Initialize the library by

```javascript
grained('elementSelector', options)
```

*`'elementSelector'`* is the selector of the container element to add the grain effect. It is important to note that
grained.js will not change the background of the container element. It appends a div element as the first child of the
container. Grained.js will add two style changes to the container element *`'position: relative; overflow: hidden'.`* If
the container position is relative, absolute, fixed or sticky then it will remand as is (only add `'overflow: hidden'`).

Since a pseudo-element `'::before'` is added with position absolute it will have the z-index priority and appears on top
of other contents in the container element. If you want the other elements in container element on top of grained effect
you have to add a css like

```css
#container > * {
  position: relative;
}

/* or */
#container .contents {
  position: relative;
}
```

So the ideal structure of implementaion is like follows

```html

<div id="container">
  <div class="contents"></div>
</div>
```

after initilizing  `grained('#container', {});` it will look like this

```html

<div id="container">
  ::before
  <div class="contents"></div>
</div>
```

Options
-------

With these options you can crate customized grained effect , these are the option parameter you can change and the default values.

```javascript
var options = {
  animate: true,
  patternWidth: 100,
  patternHeight: 100,
  grainOpacity: 0.05,
  grainDensity: 1,
  grainWidth: 1,
  grainHeight: 1
};
```

With animation true/false you can create textures with grain movement and a static one. The other value you can see the
live in **[online generator](http://sarathsaleem.github.io/grained)**
