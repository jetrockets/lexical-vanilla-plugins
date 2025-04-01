import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW
} from 'lexical'

import { $getSelectionStyleValueForProperty } from '@lexical/selection'
import { $insertList, $removeList  } from '@lexical/list'
import { $isLinkNode } from '@lexical/link'

export default function registerToolbarActions(editor, elements) {
  const {
    undoBtn,
    redoBtn,
    boldBtn,
    italicBtn,
    underlineBtn,
    ulBtn,
    olBtn,
    linkBtn,
    linkInput
  } = elements

  const updateToolbarState = (editorState) => {
    editorState.read(() => {
      const selection = $getSelection()
      if (!selection) return

      const node = selection.anchor.getNode()
      const parent = node.getParent()

      boldBtn?.classList.toggle('lexical__btn-active', selection.hasFormat('bold'))
      italicBtn?.classList.toggle('lexical__btn-active', selection.hasFormat('italic'))
      underlineBtn?.classList.toggle('lexical__btn-active', selection.hasFormat('underline'))
      ulBtn?.classList.toggle('lexical__btn-active', isListType(node, 'bullet'))
      olBtn?.classList.toggle('lexical__btn-active', isListType(node, 'number'))

      const isLink = $isLinkNode(parent)
      linkBtn?.classList.toggle('lexical__btn-active', isLink)
      if (linkInput) linkInput.value = isLink ? parent.getURL() : ''
    })
  }

  const isListType = (node, type) => {
    if (!node) return false
    if (node.getType() === 'list' && node.getListType() === type) return true
    return isListType(node.getParent(), type)
  }

  editor.registerCommand(
    CAN_UNDO_COMMAND,
    (payload) => {
      if (undoBtn) undoBtn.disabled = !payload
      return false
    },
    COMMAND_PRIORITY_LOW
  )

  editor.registerCommand(
    CAN_REDO_COMMAND,
    (payload) => {
      if (redoBtn) redoBtn.disabled = !payload
      return false
    },
    COMMAND_PRIORITY_LOW
  )

  return {
    undo: () => editor.dispatchCommand(UNDO_COMMAND),
    redo: () => editor.dispatchCommand(REDO_COMMAND),
    bold: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold'),
    italic: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic'),
    underline: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline'),
    alignLeft: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left'),
    alignCenter: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center'),
    alignRight: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right'),
    alignJustify: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify'),
    listBullet: () => {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const node = selection.anchor.getNode()
          isListType(node, 'bullet')
            ? $removeList(editor)
            : $insertList(editor, 'bullet')
        }
      })
    },
    listOrdered: () => {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const node = selection.anchor.getNode()
          isListType(node, 'number')
            ? $removeList(editor)
            : $insertList(editor, 'number')
        }
      })
    },
    updateToolbarState
  }
}
