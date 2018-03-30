clientConfig = {
  inputMaskCurrency: {
    alias: "numeric",
    groupSeparator: ",",
    autoGroup: true,
    digits: 2,
    digitsOptional: false,
    prefix: "R$ ",
    placeholder: "0"
  },
  pickerLocale: {
    format: "DD/MM/YYYY",
    separator: " - ",
    applyLabel: "Aplicar",
    cancelLabel: "Cancelar",
    fromLabel: "De",
    toLabel: "Até",
    customRangeLabel: "Personalizado",
    weekLabel: "S",
    daysOfWeek: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"
    ],
    firstDay: 1
  }
};
