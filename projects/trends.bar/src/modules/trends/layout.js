
export const getFirstValue = (groupKey, subGroupKey, valueNameKey, datasets) => {
  return datasets[groupKey][subGroupKey][valueNameKey][0].y;
};

export const getLastValue = (groupKey, subGroupKey, valueNameKey, datasets) => {
  const ds = datasets[groupKey][subGroupKey][valueNameKey];
  return ds[ds.length - 1].y;
};

export const getEmptyDefaultValue = (groupKey, subGroupKey, valueNameKey, datasets) => {
  return "Fill me with ideas";
};

export const resolveFunction = (valueFunctionName, groupKey, subGroupKey, valueNameKey, datasets) => {
  switch (valueFunctionName) {
    case "getLastValue":
      return getLastValue(groupKey, subGroupKey, valueNameKey, datasets);
    case "getFirstValue":
      return getFirstValue(groupKey, subGroupKey, valueNameKey, datasets);
    default:
      return datasets ? datasets[0].headers[0].name : null;
  }
};

export const getDefaultCellContent = (i, datasets) => {
  return getDefaultWidgetContent("text", i, datasets);
};

export const getDefaultWidgetContent = (type, i, datasets) => {
  switch (type) {
    case "text": {
      return getDefaultWidgetTextContent(i, datasets);
    }
    case "table": {
      return getDefaultWidgetTableContent(i);
    }
    case "graphxy": {
      return getDefaultWidgetGraphXYContent(i);
    }
    default: {
      return getDefaultWidgetTextContent(i, datasets);
    }
  }
};

export const startupState = (datasets) => {
  const groupKey = datasets && Object.keys(datasets)[0];
  const subGroupKey = groupKey && Object.keys(datasets[Object.keys(datasets)[0]])[0];
  const valueNameKey = subGroupKey && Object.keys(datasets[Object.keys(datasets)[0]][Object.keys(datasets[Object.keys(datasets)[0]])[0]])[0];
  const valueFunction = valueNameKey ? getLastValue : getEmptyDefaultValue;
  return {
    groupKey,
    subGroupKey,
    valueNameKey,
    valueFunctionName: valueFunction.name,
    overtitle: "subGroupKey",
    title: "valueFunction",
    subtitle: "valueNameKey",
  }
};

const getDefaultWidgetGraphXYContent = (i) => {
  return {
    i: i.toString(),
    type: "graphxy",
    graphXYTitle: "Graph title",
    graphXYXDataType: "data",
    graphXYSeries: [
      getDefaultWidgetGraphXYSerieContent()
    ]
  }
};

export const getDefaultWidgetGraphXYSerieContent = () => {
  return {
    title: "Serie",
    query: "$[0].values[*]",
    fieldX: "x",
    transformX: "tomsDate",
    fieldY: "y",
    transformY: "",
    fillArea: "false",
    bullet: "circle",
    lineWidth: "1",
    lineStyle: "1"
  }
};

const getDefaultWidgetTextContent = (i, datasets) => {
  const ds = startupState(datasets);
  return {
    i: i.toString(),
    type: "text",
    ...ds,
  }
};

const getDefaultWidgetTableContent = (i) => {
  return {
    i: i.toString(),
    type: "table",
    tableKeyTitle: "Date",
    tableKeyQuery: "$[0].values[*]",
    tableKeyField: "x",
    tableKeyTransform: "toDateDD/MM/YYYY",
    tableColumns: [
      getDefaultWidgetTableColumnContent()
    ]
  };
};

export const getDefaultWidgetTableColumnContent = () => {
  return {
    title: "Column",
    query: "$[0].values[*]",
    field: "y",
    transform: ""
  }
};
