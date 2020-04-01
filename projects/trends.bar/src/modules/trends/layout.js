export const getDefaultTrendLayout = (trendId, username) => {

  const granularity = 3;
  const cols = 3;
  const width = 936;
  const name = "Grid3x3";

  let gridLayout = [];
  let gridContent = [];
  let i = 0;
  for ( let y = 0; y < 3; y++ ) {
    for ( let x = 0; x < 3; x++ ) {
      gridLayout.push( {
        i: i.toString(), x: x*granularity, y: y*granularity, w: granularity, h: granularity
      });
      gridContent.push(getDefaultCellContent(i));
      i++;
    }
  }

  return {
    name,
    trendId,
    username,
    granularity,
    cols,
    width,
    gridLayout,
    gridContent
  }
};

export const getDefaultCellContent = (i) => {
  return {
    i: i.toString(),
    type: "text",
    title: "Title "+i.toString(),
    subTitle: "Subtitle "+i.toString()
  };
}
