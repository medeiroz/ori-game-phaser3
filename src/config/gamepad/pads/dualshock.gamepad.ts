import { GamepadMappingType } from '../../../types/GamepadMapping.type'

export const dualshockGamepad: GamepadMappingType = {
  padID: 'Dualshock',
  padType: 'Sony',
  gamepadMapping: {
    RC_S: 0, // Right Cluster South - X
    RC_E: 1, // Right Cluster East - O
    RC_W: 2, // Right Cluster West - [] / Square
    RC_N: 3, // Right Cluster North - /\ / Triangle
    START: 9, // Options / Start
    SELECT: 8, // Share / Select
    LB: 4, // L1
    RB: 5, // R1
    LT: 6, // L2
    RT: 7, // R2
    LS: 10, // L3
    RS: 11, // R3
    LC_N: 12, // Left Cluster North - D-Pad Up
    LC_S: 13, // Left Cluster South - D-Pad Down
    LC_W: 14, // Left Cluster West - D-Pad Left
    LC_E: 15, // Left Cluster East - D-Pad Right
    MENU: 16, // PS Button / Menu / View / Share
    TOUCH: 17, // Touchpad
  },
}
