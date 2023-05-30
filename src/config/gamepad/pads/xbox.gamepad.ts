import { GamepadMappingType } from '../../../types/GamepadMapping.type'

export const xboxGamepad: GamepadMappingType = {
  padID: 'Xbox 360 controller (XInput STANDARD GAMEPAD)',
  padType: 'xbox',
  gamepadMapping: {
    RC_S: 0, // Right Cluster South - A
    RC_E: 1, // Right Cluster East - B
    RC_W: 2, // Right Cluster West - X
    RC_N: 3, // Right Cluster North - Y
    START: 9, // Start
    SELECT: 8, // Select, Back
    LB: 4, // Left Bumper
    RB: 5, // Right Bumper
    LT: 6, // Left Trigger
    RT: 7, // Right Trigger
    LS: 10, // Left Stick
    RS: 11, // Right Stick
    LC_N: 12, // Left Cluster North - D-Pad Up
    LC_S: 13, // Left Cluster South - D-Pad Down
    LC_W: 14, // Left Cluster West - D-Pad Left
    LC_E: 15, // Left Cluster East - D-Pad Right
    MENU: 16, // Xbox Button / Menu / View / Share
  },
}
