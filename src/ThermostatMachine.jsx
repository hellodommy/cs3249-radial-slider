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
import { Machine, assign } from "xstate";

const updateCurrentTemp = assign({
  currTemp: (context, event) => event.currTemp
});

const updateTargetTemp = assign({
  targetTemp: (context, event) => event.targetTemp,
});

const colourGrey = assign({
  colour: (context, event) => "#E5E7EB",
});

const colourBlue = assign({
  colour: (context, event) => "#BFDBFE",
});

const colourRed = assign({
  colour: (context, event) => "#FECACA",
});

const thermostatMachine = Machine(
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
            { target: "off", cond: "isNormal", actions: [colourGrey] },
            { target: "cooling", cond: "isHot", actions: [colourBlue] },
            { target: "heating", cond: "isCold", actions: [colourRed] },
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

export default thermostatMachine;