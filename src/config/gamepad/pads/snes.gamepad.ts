import { GamepadMappingType } from '../../../types/GamepadMapping.type'

export const snesGamepad: GamepadMappingType = {
  padID: '081f-e401',
  padType: 'snes',
  gamepadMapping: {
    RC_S: 2, // Right Cluster South - B
    RC_E: 1, // Right Cluster East - Y
    RC_W: 3, // Right Cluster West - A
    RC_N: 0, // Right Cluster North - X
    START: 9, // Start / Options
    SELECT: 8, // Select / Back
    LB: 4, // L1
    RB: 5, // R1
    LC_N: 12, // Left Cluster North - D-Pad Up
    LC_S: 13, // Left Cluster South - D-Pad Down
    LC_W: 14, // Left Cluster West - D-Pad Left
    LC_E: 15, // Left Cluster East - D-Pad Right
  },
}
