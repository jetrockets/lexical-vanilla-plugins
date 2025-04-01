# lexical-vanilla-plugins

Vanilla JS (Stimulus-friendly) plugin set for Lexical editor.

## Install

```bash
npm install lexical-vanilla-plugins


## Usage
```
import { registerToolbarActions } from 'lexical-vanilla-plugins'

const actions = registerToolbarActions(editor, {
  boldBtn: document.querySelector('#bold'),
  italicBtn: document.querySelector('#italic'),
  // ...other buttons
})
```
