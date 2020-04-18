import React from "reactn";
import {DataSourcesContainer} from "./DataSources-styled";
import "./DataSources.css"
import {ScriptEditor} from "./ScriptEditor";
import {Container} from "react-bootstrap";
import {RowSeparator, RowSeparatorDouble} from "../../../../futuremodules/reactComponentStyles/reactCommon";
import {UserDataSources} from "./UserDataSources";
import {DataSourcesCreator} from "./DataSourcesCreator";
import {EditingUserTrendDataSource} from "../../../../modules/trends/globals";
import {checkBoolDefinedAndTrue} from "../../../../futuremodules/utils/utils";
import {useGlobalState} from "../../../../futuremodules/globalhelper/globalHelper";
import {Fragment} from "react";
import {ImportDataSources} from "./ImportDataSources";

export const DataSources = ({layout, setLayout}) => {

  const isEditingDataSource = checkBoolDefinedAndTrue(useGlobalState(EditingUserTrendDataSource));

  return (
    <Fragment>
      <DataSourcesContainer>
        {!isEditingDataSource &&
        <Container fluid>
          <UserDataSources/>
          <RowSeparatorDouble/>
          <ImportDataSources setLayout={setLayout}/>
          <RowSeparator/>
          <RowSeparatorDouble/>
          <DataSourcesCreator/>
        </Container>
        }
      </DataSourcesContainer>
      <ScriptEditor layout={layout} setLayout={setLayout}/>
    </Fragment>
  );
};
