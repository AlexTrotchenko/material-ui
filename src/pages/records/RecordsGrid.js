import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";
import { Chip, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";
import CheckIcon from "@mui/icons-material/Check";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Clear } from "@mui/icons-material";

const getStatus = (params) => {
  const readyTime = params.getValue(params.id, "readyDateTime");
  const now = DateTime.now();
  return now > readyTime;
};

const odlisovano = ({ value }) => {
  return <>{value ? <CheckIcon color="success" /> : <Clear color="error" />}</>;
};

const cellStatus = ({ value }) => {
  return (
    <Chip
      variant="outlined"
      color={value ? "success" : "warning"}
      icon={value ? <CheckIcon /> : <WarningAmberIcon />}
      label={value ? "Odstáta" : "Nie odstata"}
    />
  );
};

const dateFormat = (params) => {
  const valueFormatted = DateTime.fromJSDate(params.value).toLocaleString({
    ...DateTime.DATETIME_SHORT,
    hour12: false,
  });
  return `${valueFormatted} `;
};

const useStyles = makeStyles({
  row: {
    "&:hover": { cursor: "pointer" },
  },
});

const columns = [
  {
    field: "dateTime",
    headerName: "Miešanie",
    type: "dateTime",
    width: 200,
    editable: "false",
    valueFormatter: dateFormat,
  },
  { field: "hmota", headerName: "Hmota", width: 150 },

  {
    field: "readyDateTime",
    headerName: "Lisovať",
    width: 200,
    type: "dateTime",
    valueFormatter: dateFormat,
  },
  {
    field: "isReady",
    headerName: "Stav",
    width: 150,
    valueGetter: getStatus,
    renderCell: cellStatus,
  },
  {
    field: "odlisovano",
    headerName: "Odlisovano",
    width: 150,
    renderCell: odlisovano,
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function RecordsGrid({ rows }) {
  const classes = useStyles();
  const history = useHistory();
  const { loading } = useSelector((state) => state.async);

  return (
    <Container>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          components={{
            Toolbar: CustomToolbar,
          }}
          classes={classes}
          rows={rows}
          disableSelectionOnClick
          columns={columns}
          loading={loading}
          hideFooterSelectedRowCount={true}
          onRowClick={({ id }) => {
            history.push(`/records/${id}`);
          }}
        />
      </div>
    </Container>
  );
}
