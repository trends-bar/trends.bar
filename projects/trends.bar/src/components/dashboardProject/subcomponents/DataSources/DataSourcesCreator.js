import React from "reactn";
import "./DataSources.css"
import {Fragment, useState} from "react";
import {api, useApi} from "../../../../futuremodules/api/apiEntryPoint";
import {addNewScript} from "../../../../futuremodules/fetch/fetchApiCalls";
import {useTrendIdGetter} from "../../../../modules/trends/globals";
import {checkURLValid, objectExistOnWithCallback} from "../../../../futuremodules/utils/utils";
import {Button, Form, InputGroup, Row} from "react-bootstrap";
import {PlusTitle, RowSeparator} from "../../../../futuremodules/reactComponentStyles/reactCommon";

export const DataSourcesCreator = () => {

  const fetchApi = useApi('fetch');
  const trendId = useTrendIdGetter();
  const [formData, setFromData] = useState({});

  const onChange = e => {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const gatherSource = () => {
    api(fetchApi, addNewScript, {url: formData.sourceDocument, trendId}).then();
  };

  const formLabelInputSubmitEntry = (onClickCallback, key, placeholder = "", required = false, defaultValue = null) => (
    <Fragment key={key}>
      <InputGroup className="mb-1">
        <Form.Control name={key} placeholder={placeholder} defaultValue={defaultValue}
                      onChange={e => onChange(e)} required={required}/>
        <InputGroup.Append>
          <Button variant="info" disabled={!objectExistOnWithCallback(formData, key, checkURLValid)}
                  onClick={() => onClickCallback()}>Create</Button>
        </InputGroup.Append>
      </InputGroup>
    </Fragment>
  );

  return (
    <Fragment>
      <Row>
        <PlusTitle text={"Crate new Data Source"}/>
      </Row>
      <RowSeparator/>
      <Row>
        {formLabelInputSubmitEntry(gatherSource, "sourceDocument", "Url of your source here", true)}
      </Row>
    </Fragment>
  );
};