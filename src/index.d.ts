import type { Editor } from 'lexical'

export interface ToolbarElements {
  undoBtn?: HTMLButtonElement
  redoBtn?: HTMLButtonElement
  boldBtn?: HTMLButtonElement
  italicBtn?: HTMLButtonElement
  underlineBtn?: HTMLButtonElement
  ulBtn?: HTMLButtonElement
  olBtn?: HTMLButtonElement
  linkBtn?: HTMLButtonElement
  linkInput?: HTMLInputElement
}

export interface ToolbarActions {
  undo: () => void
  redo: () => void
  bold: () => void
  italic: () => void
  underline: () => void
  alignLeft: () => void
  alignCenter: () => void
  alignRight: () => void
  alignJustify: () => void
  listBullet: () => void
  listOrdered: () => void
  updateToolbarState: (editorState: any) => void
}

export declare function registerToolbarActions(
  editor: Editor,
  elements: ToolbarElements
): ToolbarActions
