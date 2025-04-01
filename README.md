# lexical-vanilla-plugins

A lightweight collection of vanilla JavaScript plugins for the [Lexical](https://lexical.dev) rich text editor — designed to work seamlessly with Stimulus or plain DOM environments.

Currently includes a toolbar action handler with full formatting support. Additional plugins like emoji picker, link modal, and color picker are planned and coming soon.

## Install

```bash
npm install lexical-vanilla-plugins
# or
yarn add lexical-vanilla-plugins
```

## Usage

This package provides a registerToolbarActions function that connects UI buttons to a Lexical editor instance.

```js
import { registerToolbarActions } from 'lexical-vanilla-plugins'

const toolbarActions = registerToolbarActions(editor, {
  boldBtn: document.querySelector('#bold'),
  italicBtn: document.querySelector('#italic'),
  underlineBtn: document.querySelector('#underline'),
  ulBtn: document.querySelector('#ul'),
  olBtn: document.querySelector('#ol'),
  undoBtn: document.querySelector('#undo'),
  redoBtn: document.querySelector('#redo'),
  linkBtn: document.querySelector('#link'),
  linkInput: document.querySelector('#linkInput'),
}, {
  activeClass: 'lexical__btn-active' // optional, default is 'active'
})
```

## Available Actions
```js
toolbarActions.bold()
toolbarActions.italic()
toolbarActions.underline()

toolbarActions.alignLeft()
toolbarActions.alignCenter()
toolbarActions.alignRight()
toolbarActions.alignJustify()

toolbarActions.undo()
toolbarActions.redo()

toolbarActions.listBullet()
toolbarActions.listOrdered()
```

## Stimulus Example
```js
// lexical_controller.js
import { registerToolbarActions } from 'lexical-vanilla-plugins'

connect () {
  this.toolbarActions = registerToolbarActions(this.editor, {
    boldBtn: this.boldBtnTarget,
    italicBtn: this.italicBtnTarget,
    underlineBtn: this.underlineBtnTarget,
    ulBtn: this.ulBtnTarget,
    olBtn: this.olBtnTarget,
    undoBtn: this.undoBtnTarget,
    redoBtn: this.redoBtnTarget,
    linkBtn: this.linkBtnTarget,
    linkInput: this.linkInputTarget,
  }, {
    activeClass: 'lexical__btn-active'
  })
}

bold () {
  this.toolbarActions.bold()
}
```

```html
<!-- In your view (ERB/HTML/etc) -->
<button
  type="button"
  data-action="lexical#bold"
  data-lexical-target="boldBtn"
  class="lexical__btn">
  <svg>...</svg>
</button>
```

### Customization
	- activeClass – CSS class to apply to buttons when the current selection matches (e.g. bold, ul, link, etc).
	- Default: 'active'
	- You can override it with any class name, e.g. 'is-active', 'lexical__btn-active', etc.

### Requirements
	- @lexical/list >= 0.29.0 (older versions may insert <ul> even when using 'number' type)
	- Lexical >= 0.12.0

### Coming soon
	- Emoji plugin
	- Link plugin
	- Color picker plugin
