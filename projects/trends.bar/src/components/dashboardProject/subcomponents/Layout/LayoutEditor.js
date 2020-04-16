import "./react-grid-styles.css"
import "./react-resizable-styles.css"

import React, {Fragment, useEffect, useGlobal, useState} from "reactn";
import GridLayout from 'react-grid-layout';
import {DivLayout, SpanRemoveLayoutCell} from "./LayoutEditor.styled";
import {Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";
import {getDefaultCellContent, getDefaultTrendLayout, globalLayoutState} from "../../../../modules/trends/layout";
import {upsertTrendLayout} from "../../../../modules/trends/mutations";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {getTrendGraphsByUserTrendId, getTrendLayouts} from "../../../../modules/trends/queries";
import {EditingLayoutDataSource, useTrendIdGetter} from "../../../../modules/trends/globals";
import {getQueryLoadedWithValueArrayNotEmpty} from "../../../../futuremodules/graphqlclient/query";
import {CellContentEditor} from "../CellContentEditor";
import {ContentWidget} from "../ContentWidget";
import {ButtonDiv, DangerColorSpan} from "../../../../futuremodules/reactComponentStyles/reactCommon.styled";
import {useGlobalState} from "../../../../futuremodules/globalhelper/globalHelper";

export const LayoutEditor = ({username}) => {

  const trendId = useTrendIdGetter();
  const datasets = useGlobalState(EditingLayoutDataSource);

  const [trendLayoutMutation] = useMutation(upsertTrendLayout);
  const trendLayoutQuery = useQuery(getTrendLayouts(), {variables: {name: username, trendId: trendId}});
  const trendDataQuery = useQuery(getTrendGraphsByUserTrendId(), {variables: {name: username, trendId: trendId}});

  const [layout, setLayout] = useGlobal(globalLayoutState);
  const [absoluteIndex, setAbsoluteIndex] = useState(0);
  const [, setEditingCellKey] = useState(null);
  const [editingCellContent, setEditingCellContent] = useState(null);
  const [trendData, setTrendData] = useState({});

  useEffect( ()=> {
    if ( !layout && datasets ) {
      const ll = {
        ...getDefaultTrendLayout(datasets),
        trendId,
        username
      };
      setAbsoluteIndex(Math.max(...(ll.gridLayout.map((v) => Number(v.i)))) + 1);
      setLayout(ll).then();
    }
  }, [layout, setLayout, datasets, trendId, username] );

  useEffect(() => {
    trendLayoutQuery.refetch().then(() => {
        const queryLayout = getQueryLoadedWithValueArrayNotEmpty(trendLayoutQuery);
        if (queryLayout) {
          setLayout(queryLayout[0]);
          setAbsoluteIndex(Math.max(...(queryLayout[0].gridLayout.map((v) => Number(v.i)))) + 1);
        }
      }
    );
  }, [trendLayoutQuery, setLayout]);

  useEffect(() => {
    trendDataQuery.refetch().then(() => {
        const queryData = getQueryLoadedWithValueArrayNotEmpty(trendDataQuery);
        if (queryData) {
          setTrendData(queryData);
        }
      }
    );
  }, [trendDataQuery]);


  const onGridLayoutChange = (gridLayout) => {
    setLayout({
      ...layout,
      gridLayout: gridLayout
    });
  };

  const onAddCell = () => {
    const newGridLayout = [...layout.gridLayout];
    const newGridContent = [...layout.gridContent];
    const newIndex = absoluteIndex;
    console.log("NI" + newIndex);
    setAbsoluteIndex(newIndex + 1);
    newGridLayout.push({
      i: newIndex.toString(),
      x: 0,
      y: Infinity,
      w: 1,
      h: 1
    });
    newGridContent.push(getDefaultCellContent(newIndex));
    setLayout({
      ...layout,
      gridLayout: newGridLayout,
      gridContent: newGridContent
    });
  };

  const onRemoveCell = (cellCode) => {
    const newGridLayout = [...layout.gridLayout];
    const newGridContent = [...layout.gridContent];
    newGridLayout.splice(newGridLayout.findIndex(c => c.i === cellCode), 1);
    newGridContent.splice(newGridContent.findIndex(c => c.i === cellCode), 1);
    setLayout({
      ...layout,
      gridLayout: newGridLayout,
      gridContent: newGridContent
    });
  };

  // const onEditCell = (cellCode) => {
  //   //console.log("Edit cell "+cellCode);
  //   setEditingCellKey(cellCode);
  //   setEditingCellContent(layout.gridContent.filter(v => v.i === cellCode)[0]);
  // };

  const onSaveLayout = () => {
    //console.log(trendId);
    //console.log(username);
    console.log("SAVING:", layout);
    trendLayoutMutation({
      variables: {
        trendLayout: layout
      }
    }).then();
  };

  const onSaveCellContent = (content) => {
    // console.log("SAVE", JSON.stringify((content)));
    const newGridContent = [...layout.gridContent];
    newGridContent[newGridContent.findIndex(c => c.i === content.i)] = {...content};
    setLayout({
      ...layout,
      gridContent: newGridContent
    });
    // setEditingCellKey(null);
    // setEditingCellContent(null);
  };

  const onCancelSaveCellContent = () => {
    console.log("CANCEL");
    setEditingCellKey(null);
    setEditingCellContent(null);
  };

  if (editingCellContent) {
    return (
      <CellContentEditor
        data={trendData}
        content={editingCellContent}
        onSave={onSaveCellContent}
        onCancel={onCancelSaveCellContent}
      />
    )
  }

  if ( !layout ) {
    return <Fragment/>
  }

  return (
    <Fragment>
      <ButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
        <ButtonGroup aria-label="First group">
          <Button onClick={onAddCell}>Add Cell</Button>{' '}
        </ButtonGroup>
        <ButtonGroup>
          <Button onClick={onSaveLayout}>Save Layout</Button>
        </ButtonGroup>
      </ButtonToolbar>
      <GridLayout layout={layout.gridLayout}
                  cols={12}
                  rowHeight={50}
                  width={1024}
                  onLayoutChange={onGridLayoutChange}>
        {layout.gridLayout.map(elem => {
          return (
            <DivLayout key={elem.i}>
              <ContentWidget data={trendData}
                             cellIndex={elem.i}
                             onSave={onSaveCellContent}
              />
              <SpanRemoveLayoutCell title="Remove cell">
                <ButtonDiv onClick={() => onRemoveCell(elem.i)}>
                  <DangerColorSpan><i className={"fas fa-times"}/></DangerColorSpan>
                </ButtonDiv>
              </SpanRemoveLayoutCell>
            </DivLayout>
          );
        })}
      </GridLayout>
    </Fragment>
  )
};