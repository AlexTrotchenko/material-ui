import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { listenToRecordFromFirestore } from "../../firestoreService";
import useFirestoreDoc from "../../hooks/useFirestoreDoc";
import { listenToSelectedContainer } from "../../redux/recordReducer/recordActions";
import { DateTime } from "luxon";
import QRcode from "qrcode.react";
import {
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import DetailPageActions from "../../components/ui/speadDial";
import { useReactToPrint } from "react-to-print";

const RecordDetails = () => {
  const { id } = useParams();
  const { loading } = useSelector((state) => state.async);
  const { selectedRecord } = useSelector((state) => state.records);
  const { authenticated } = useSelector((state) => state.auth);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const dispatch = useDispatch();
  useFirestoreDoc({
    shouldExecute: Boolean(id),
    query: () => listenToRecordFromFirestore(id),
    data: (container) => dispatch(listenToSelectedContainer(container)),
    deps: [id, dispatch],
  });

  return (
    <>
      {!loading && selectedRecord ? (
        <>
          <Container ref={componentRef}>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <Typography textAlign="n" variant="h2">
                  {selectedRecord.hmota}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">{`Hmota bola pripravena ${DateTime.fromJSDate(
                  selectedRecord.dateTime
                ).toLocaleString({
                  ...DateTime.DATETIME_SHORT,
                  hour12: false,
                })}`}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">{`Lisovať ${DateTime.fromJSDate(
                  selectedRecord.readyDateTime
                ).toLocaleString({
                  ...DateTime.DATETIME_SHORT,
                  hour12: false,
                })}`}</Typography>
              </Grid>
              <Grid item>
                <QRcode value={id} />
              </Grid>
            </Grid>
          </Container>
          {authenticated && <DetailPageActions handlePrint={handlePrint} />}
        </>
      ) : (
        <Backdrop open={true}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
    </>
  );
};

export default RecordDetails;
