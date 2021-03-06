import {arrayExistsNotEmpty} from "../../futuremodules/utils/utils";

export const hasGraphData = data => {
  return data !== undefined && data.length !== 0;
}

export const isEmptyGraph = data => {
  return !hasGraphData(data);
}

const checkTitleAndLabelBelongToGraph = (trendGraph, titles, label) => {
  for ( const title of titles ) {
    if (trendGraph.yValueName === title && trendGraph.yValueSubGroup === label) return true;
  }
  return false;
}

const itemclick = e => {
  if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
    e.dataSeries.visible = false;
  } else {
    e.dataSeries.visible = true;
  }
  e.chart.render();
};

export const elaborateDataGraphs = (data, label, titles) => {

  const optionsBase = {
    zoomEnabled: true,
    axisX: {
      valueFormatString: "DD MMM"
    },
    title: {
      text: label,
    },
    legend: {
      cursor: "pointer",
      itemclick: itemclick
    },
    theme: "dark1",
    backgroundColor: "#00000000",
    animationEnabled: true,
    interactivityEnabled: true,
  };

  if (isEmptyGraph(data)) return optionsBase;

  let allPoints = [];
  for (const trendGraph of data) {
    if ( checkTitleAndLabelBelongToGraph(trendGraph, titles, label ) ) {
      allPoints.push( {
        label: "Total " + trendGraph.yValueName,
        data: trendGraph.values,
        type: "area",
      });
      if ( arrayExistsNotEmpty(trendGraph.valuesDx) ) {
        allPoints.push( {
          label: "Daily " + trendGraph.yValueName,
          data: trendGraph.valuesDx,
          type: "column",
        });
      }
      // if ( arrayExistsNotEmpty(trendGraph.valuesDxPerc) ) {
      //   allPoints.push( {
      //     label: trendGraph.yValueName + " SpeedPerc",
      //     data: trendGraph.valuesDxPerc,
      //     type: "column",
      //   });
      // }
      // if ( arrayExistsNotEmpty(trendGraph.valuesDx2) ) {
      //   allPoints.push( {
      //     label: trendGraph.yValueName + " Acceleration",
      //     data: trendGraph.valuesDx2,
      //     type: "spline",
      //   });
      // }
    }
  }

  const gdata =[];
  for ( const points of allPoints ) {
    gdata.push( {
      xValueType: "dateTime",
      showInLegend: true,
      type: points.type,
      legendText: points.yValueSubGroup,
      dataPoints: points.data
    });
  }

  const chartsOptions = {
    ...optionsBase,
    data: gdata
  };

  return chartsOptions;
};

export const groupData = ( graphData, groupBy, fields, sortBy, sortOrder = 1 ) => {
  let countries = {};
  for (const elem of graphData) {
    for ( const field of fields ) {
      if ( elem.yValueName === field ) {
        countries[elem[groupBy[0]]] = {
          ...countries[elem[groupBy[0]]],
          [field]: elem.values[elem.values.length - 1].y
        };
      }
    }
  }

  const finalDataUnsorted = [];
  for (const elem of Object.keys(countries)) {
    finalDataUnsorted.push( {
      [groupBy[1]]: elem,
      ...countries[elem]
    } );
  }

  const finalData = finalDataUnsorted.sort( (a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return sortOrder === 1 ? 1 : -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return sortOrder === 1 ? -1 : 1;
      }
      return 0;
    }
  );

  return finalData;
};

export const groupDataWithDerivatives = ( graphData, groupBy, fields, sortBy, sortOrder = 1 ) => {
  let countries = {};
  for (const elem of graphData) {
    for ( const field of fields ) {
      if ( elem.yValueName === field ) {
        countries[elem[groupBy[0]]] = {
          ...countries[elem[groupBy[0]]],
          [field]: elem.values[elem.values.length - 1].y,
          [field+"(Dx)"]: elem.valuesDx[elem.valuesDx.length - 1].y,
          [field+"(Dx%)"]: elem.valuesDxPerc[elem.valuesDxPerc.length - 1].y,
          [field+"(Dx2)"]: elem.valuesDx2[elem.valuesDx2.length - 1].y
        };
      }
    }
  }

  const finalDataUnsorted = [];
  for (const elem of Object.keys(countries)) {
    finalDataUnsorted.push( {
      [groupBy[1]]: elem,
      ...countries[elem]
    } );
  }

  const finalData = finalDataUnsorted.sort( (a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return sortOrder === 1 ? 1 : -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return sortOrder === 1 ? -1 : 1;
      }
      return 0;
    }
  );

  return finalData;
};

export const positiveSignForDx2 = (elem) => {
  if ( !elem.percSignPosTrend ) return 1;
  return elem.percSignPosTrend;
};

export const float100ToPerc = (value) => {
  return Number(value).toFixed(2)+"%";
};

export const arrayOfObjectsToSet = sourceArray => {
  let sets = [];

  const keys = new Set();
  for ( const elem of Object.keys(sourceArray[0]) ) {
    keys.add(elem);
  }

  for ( const key of keys ) {
    let kset = new Set();
    for ( const elem of sourceArray ) {
      kset.add(elem[key])
    }
    sets.push(kset);
  }

  return sets;
};

export const arrayOfTrendIdAndUsernameToSet = (sourceArray) => {

  let ret = [];
  for (const elem of sourceArray) {
    for ( const username of elem.username ) {
      ret.push({
        count: elem.count,
        trendId: elem.trendId[0],
        username
      });
    }
  }
  return ret;
};

export const graphArrayToGraphTree2 = ( sourceArray ) => {
  let ret = {};
  const key1="yValueGroup";
  const key2="yValueSubGroup";
  const key3= "yValueName";
  const key4 = "values";
  const groupsSet = new Set();
  const yValueSet = new Set();
  sourceArray.map(elem => groupsSet.add(elem[key1]));
  sourceArray.map(elem => yValueSet.add(elem[key3]));
  for ( const group of groupsSet.values() ) {
    ret[group] = {};
    for ( const elem of sourceArray) {
      const subGroup = elem[key2];
      if ( elem[key1] === group ) {
        for ( const yv of yValueSet.values() ) {
          if ( !ret[group][subGroup] ) {
            ret[group][subGroup] = {};
          }
          if ( elem[key3] === yv ) {
            ret[group][subGroup][yv] = elem[key4];
          }
        }
      }
    }
  }
  return ret;
};
