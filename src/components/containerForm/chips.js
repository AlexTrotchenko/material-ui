import { Chip, CircularProgress, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { listenLastHmotaVal } from "../../firestoreService";
import useFirestoreDoc from "../../hooks/useFirestoreDoc";
import { setLastValFromDb } from "../../redux/recordReducer/recordActions";

const ChipsArray = ({ handleClick }) => {
  const dispatch = useDispatch();

  const lastVal = useSelector((state) => state.records.lastVal);
  useFirestoreDoc({
    query: listenLastHmotaVal,
    data: ({ lastVal }) => {
      dispatch(setLastValFromDb(lastVal));
    },
    deps: [dispatch],
  });
  return (
    <Grid item>
      <Grid container justifyContent="space-between" direction="row">
        {lastVal.map((item, idx) => (
          <Grid item key={idx}>
            <Grid item>
              <Chip
                label={item ? item : <CircularProgress size={20} />}
                variant="outlined"
                color="primary"
                onClick={() => handleClick(item)}
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
export default ChipsArray;
