import { combineReducers } from "redux";
import userReducer from "./user-reducer";
import alertReducer from "./alert-reducer";
import dashboardReducer from "./dashboard-reducer";

export default combineReducers({
  userOperation: userReducer,
  alert: alertReducer,
  dashboard: dashboardReducer
});
