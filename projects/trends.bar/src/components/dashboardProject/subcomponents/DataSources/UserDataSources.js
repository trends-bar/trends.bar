import React from "reactn";
import "./DataSources.css"
import {Fragment, useEffect, useState} from "react";
import {api, useApi} from "../../../../futuremodules/api/apiEntryPoint";
import {deleteScript, getScripts, patchScript} from "../../../../futuremodules/fetch/fetchApiCalls";
import {
  DangerColorSpan,
  FlexWithBorder,
  InfoTextSpan,
  SecondaryAltColorTextSpanBold
} from "../../../../futuremodules/reactComponentStyles/reactCommon.styled";
import {arrayExistsNotEmpty} from "../../../../futuremodules/utils/utils";
import {Col, Container, Dropdown, Row, SplitButton} from "react-bootstrap";
import {RocketTitle, RowSeparator} from "../../../../futuremodules/reactComponentStyles/reactCommon";

export const UserDataSources = ({layout}) => {

  return (
    <Fragment>
      <Row>
        <Col>
          <RocketTitle text={"Curating:"}/>
        </Col>
      </Row>
      <RowSeparator/>
      <Container fluid>
        {arrayExistsNotEmpty(layout.dataSources) && layout.dataSources.map(elem => {
            return (
              <Row key={elem.name}>
                <FlexWithBorder width={"50%"}>
                  <div>
                    <SecondaryAltColorTextSpanBold>
                      {elem.name}
                    </SecondaryAltColorTextSpanBold>
                  </div>
                  <div>
                    <SplitButton
                      title={<b>Update</b>}
                      variant="info"
                      onClick={() => console.log("updateScript(elem.name)")}>
                      <Dropdown.Item>Set to repeat</Dropdown.Item>
                      <Dropdown.Divider/>
                      <Dropdown.Item onClick={() => {} }>
                        <DangerColorSpan>Delete</DangerColorSpan>
                      </Dropdown.Item>
                    </SplitButton>
                  </div>
                </FlexWithBorder>
              </Row>
            )
          }
        )}
      </Container>
      {!arrayExistsNotEmpty(layout.dataSources) && (
        <InfoTextSpan>Nothing yet! Grab or create a new one.</InfoTextSpan>
      )}
    </Fragment>
  )
};
