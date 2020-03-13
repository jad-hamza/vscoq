'use strict';
import * as vscode from 'vscode';

const STM_FOCUS_IMAGE = "out/images/stm-focus.svg";
const STM_FOCUS_IMAGE_BEFORE = "out/images/stm-focus-before.svg";
const STM_FOCUS_IMAGE_PROOF_VIEW = "out/images/stm-focus-proof-view.svg";

interface DecorationsInternal extends Decorations {
  processing: vscode.TextEditorDecorationType;
  processingLine: vscode.TextEditorDecorationType;
  stateError: vscode.TextEditorDecorationType;
  processed: vscode.TextEditorDecorationType
  processedLine: vscode.TextEditorDecorationType
  incomplete: vscode.TextEditorDecorationType; // Example: a Qed. whose proof failed.
  axiom: vscode.TextEditorDecorationType;
  focus : vscode.TextEditorDecorationType;
  focusBefore : vscode.TextEditorDecorationType;
  proofViewFocus : vscode.TextEditorDecorationType;
}

type Decorations = Readonly<DecorationsInternal>;


export let decorations : Decorations;
let decorationsInternal : DecorationsInternal;

export function initializeDecorations(context: vscode.ExtensionContext) {
  function create(style : vscode.DecorationRenderOptions) {
    const result = vscode.window.createTextEditorDecorationType(style);
    context.subscriptions.push(result);
    return result;
  }

  const processingOptions = {
    overviewRulerColor: 'rgb(134, 60, 0)',
    overviewRulerLane: vscode.OverviewRulerLane.Center,
    light: {backgroundColor: 'rgba(0,0,255,0.3)'},
    dark: {backgroundColor: 'rgba(134, 60, 0, 0.9)'},
  }

  const processedOptions = {
    overviewRulerColor: 'rgb(20, 60, 80)',
    overviewRulerLane: vscode.OverviewRulerLane.Center,
    light: {backgroundColor: 'rgba(0,150,0,0.2)'},
    dark: {backgroundColor: 'rgba(20, 60, 80, 0.8)'},
  }

  decorationsInternal = {
    processing: create(processingOptions),
    processingLine: create(Object.assign({}, processingOptions, { isWholeLine: true })),
    stateError: create({
      light:
        { backgroundColor: 'rgba(255,0,0,0.25)' },
      dark:
        { backgroundColor: 'rgba(255,0,0,0.25)' },
    }),
    processed: create(processedOptions),
    processedLine: create(Object.assign({}, processedOptions, { isWholeLine: true })),
    axiom: create({
      overviewRulerColor: 'yellow',
      overviewRulerLane: vscode.OverviewRulerLane.Center,
      light: {backgroundColor: 'rgba(180,180,0,0.7)'},
      dark: {backgroundColor: 'rgba(120,120,0,0.7)'},
    }),
    incomplete: create({
      overviewRulerColor: 'purple', 
      overviewRulerLane: vscode.OverviewRulerLane.Center,
      light: {backgroundColor: 'violet'},
      dark: {backgroundColor: 'darkmagenta'},
    }),
    focus: create({
      gutterIconPath: context.asAbsolutePath(STM_FOCUS_IMAGE),
      gutterIconSize: "contain"
    }),
    focusBefore: create({
      gutterIconPath: context.asAbsolutePath(STM_FOCUS_IMAGE_BEFORE),
      gutterIconSize: "contain"
    }),
    proofViewFocus: create({
      gutterIconPath: context.asAbsolutePath(STM_FOCUS_IMAGE_PROOF_VIEW),
      gutterIconSize: "contain"
    }),
  };

  decorations = decorationsInternal;
}

