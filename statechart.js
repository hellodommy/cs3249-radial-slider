const updateTemp = assign({
	currTemp: (context, event) => context.currTemp === context.newCurrTemp,
	targetTemp: (context, event) => context.targetTemp == context.newTarTemp
})

const thermostateMachine = Machine(
  {
    id: "thermostat",
    initial: "off",
    context: {
      currTemp: 72,
      newCurrTemp: 72,
      targetTemp: 72,
      newTarTemp: 72,
      dT: 2,
      dTCool: 1.5,
      dTHeat: 1.5,
    },
    states: {
      off: {
        on: {
          "": [
            {
              target: "tempChecking",
              cond: "didTempChange",
              action: updateTemp,
            },
          ],
        },
      },
      tempChecking: {
        on: {
          "": [
            { target: "off", cond: "isNormal" },
            { target: "cooling", cond: "isHot" },
            { target: "heating", cond: "isCold" },
          ],
        },
      },
      cooling: {
        on: {
          "": [
            {
              target: "tempChecking",
              cond: "didTempChange",
              action: updateTemp,
            },
          ],
        },
      },
      heating: {
        on: {
          "": [
            {
              target: "tempChecking",
              cond: "didTempChange",
              action: updateTemp,
            },
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
      didTempChange: (context, event) => {
        return (
          context.currTemp !== context.newCurrTemp ||
          context.targetTemp !== context.newTarTemp
        );
      },
    },
  }
);
