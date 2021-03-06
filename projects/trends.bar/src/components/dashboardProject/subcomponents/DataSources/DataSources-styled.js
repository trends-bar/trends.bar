import styled from "styled-components";
import {checkBoolDefinedAndTrue} from "../../../../futuremodules/utils/utils";

export const DataSourcesContainer = styled.div` {
  margin: 3% 3%;
}`;

export const ScriptVariables = styled.div` {
  grid-area: scriptVariables;
  height: 6em;
}`;

export const ScriptTitle = styled.div` {
  grid-area: scriptTitle;
  display: flex;
  justify-content: space-between;
  align-self: center;
  background: #263238;
  height: 100%;
  padding: 6px;
  border-radius: 3px;
  border: 1px solid var(--gray);
}`;

export const FileManagementElement = styled.div` {
  display: flex;
  align-self: center;
}`;

export const FileManagementDxMargin = styled.div` {
  margin-right: 0.15em;
}`;

export const FileManagementSxMargin = styled.div` {
  margin-left: 0.15em;
  padding-left: 0.15em;
}`;

export const FileManagementSxPadding = styled.div` {
  padding-left: 8px;
}`;

export const ScriptFileName = styled.div` {
  align-self: center;
  border: 1px solid var(--light-color);
  border-radius: 3px;
  background-color: var(--primary);
  padding: 0.33em;
}`;

export const ScriptOutputTabs = styled.div` {
  grid-area: outputTabs;
  display: flex;
  justify-content: space-between;
  align-self: center;
}`;

export const ScriptResultTabs = styled.div` {
  
}`;

export const ScriptOutput = styled.div` {
  grid-area: scriptOutput;
}`;

export const InfoColor = styled.span`{
  color: var(--info)
}`;

export const ScriptResultContainer = styled.div` {
  margin-top: 10px;
  padding-top: 10px;
  border-radius: 3px;
  border: 1px solid var(--gray);
}`;

export const ScriptElementsContainer = styled.div`{
  height: 400px;
  overflow-y: scroll;
}`;

export const ScriptGraphContainer = styled.div`{
  min-height: 500px;
}`;

export const ScriptKeyContainer = styled.div` {
  --margin:3px;
  margin: var(--margin) 0;
  padding: 5px 10px 5px 10px;
  width: calc(100% - (var(--margin) * 2));
  min-height: 35px;
  border-radius: 3px;
  font-weight:  ${props => checkBoolDefinedAndTrue(props.selected) ? "bold" : "normal"};
  border: ${props => checkBoolDefinedAndTrue(props.selected) ? "3px" : "1px"} solid ${props => checkBoolDefinedAndTrue(props.selected) ? "var(--info)" : "var(--primary)"};
  background-color: ${props => props.backgroundColor || "none"};
  cursor: pointer;
  
  :hover {
    box-shadow: 0 0 3px 1px var(--primary-color);
  }
  
  :active {
    box-shadow: 0 0 1px 1px var(--primary-color);
  }
  overflow: hidden;
}`;

export const ScriptKeyContainerTitle = styled.h4` {
  --margin: 0 10px;
  color: var(--secondary-alt-color);
  font-weight: bold;  
}`;
