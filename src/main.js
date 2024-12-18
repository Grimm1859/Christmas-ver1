import { ChessTimer } from './modules/ChessTimer';
import { UIController } from './modules/UIController';
import { Settings } from './modules/Settings';

// Initialize modules
const settings = new Settings();
const timer = new ChessTimer(settings);
const ui = new UIController(timer, settings);

// Start the application
ui.initialize();