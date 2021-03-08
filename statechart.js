// Available variables:
// - Machine
// - interpret
// - assign
// - send
// - sendParent
// - spawn
// - raise
// - actions
// - XState (all XState exports)

import { assign } from "xstate/lib/actionTypes";

const updateTargetTemp = assign({
  targetTemp: (context, event) => event.targetTemp
})

const updateCurrentTemp = assign({
  currTemp: (context, event) => event.currTemp
})

export const thermostatMachine = Machine(
  {
    id: "thermostat",
    initial: "off",
    context: {
      targetTemp: 72,
      currTemp: 72,
      dT: 2,
      dTCool: 1.5,
      dTHeat: 1.5,
      colour: "#E5E7EB",
    },
    states: {
      off: {
        on: {
          entry: [assign({ colour: "#E5E7EB" })],
          CURR_TEMP_CHANGE: {
            target: "tempCheck",
            actions: [updateCurrentTemp],
          },
          TARGET_TEMP_CHANGE: {
            target: "tempCheck",
            actions: [updateTargetTemp],
          },
        },
      },
      cooling: {
        on: {
          entry: [assign({ colour: "#BFDBFE" })],
          CURR_TEMP_CHANGE: {
            target: "tempCheck",
            actions: [updateCurrentTemp],
          },
          TARGET_TEMP_CHANGE: {
            target: "tempCheck",
            actions: [updateTargetTemp],
          },
        },
      },
      heating: {
        on: {
          entry: [assign({ colour: "#FECACA" })],
          CURR_TEMP_CHANGE: {
            target: "tempCheck",
            actions: [updateCurrentTemp],
          },
          TARGET_TEMP_CHANGE: {
            target: "tempCheck",
            actions: [updateTargetTemp],
          },
        },
      },
      // transient state
      tempCheck: {
        on: {
          "": [
            { target: "off", cond: "isNormal" },
            { target: "cooling", cond: "isHot" },
            { target: "heating", cond: "isCold" },
          ],
        },
      },
    },
  },
  {
    guards: {
      isHot: (context, event) => {
        return (
          context.currTemp > context.targetTemp + context.dT + context.dTCool
        );
      },
      isCold: (context, event) => {
        return (
          context.currTemp < context.targetTemp - context.dT - context.dTHeat
        );
      },
      isNormal: (context, event) => {
        return (
          context.currTemp < context.targetTemp + context.dT + context.dTCool &&
          context.currTemp > context.targetTemp - context.dT - context.dTHeat
        );
      },
    },
  }
);
