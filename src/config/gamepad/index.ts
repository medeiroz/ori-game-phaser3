import { snesGamepad } from './pads/snes.gamepad'
import { dualshockGamepad } from './pads/dualshock.gamepad'
import { genericGamepad } from './pads/generic.gamepad'
import { xboxGamepad } from './pads/xbox.gamepad'
import { kebabCase } from 'lodash'
import { GamepadMappingType } from '../../types/GamepadMapping.type'

export const getAllMappings = (): GamepadMappingType[] => {
  return [xboxGamepad, genericGamepad, dualshockGamepad, snesGamepad]
}

export const findMappingById = (
  padID: string,
  fallback: GamepadMappingType | undefined = genericGamepad,
): GamepadMappingType => {
  const found = getAllMappings().find((mapping) => kebabCase(mapping.padID) === kebabCase(padID))
  return found || fallback
}
