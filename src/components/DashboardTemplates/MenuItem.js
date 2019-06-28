import React, { Fragment } from "react";
import { ListItem, ListItemIcon, DashboardIcon, ListItemText } from "../../includes";
import { Link } from "react-router-dom";

export const mainListItems = (
  <Fragment>
    <Link to="/dashboard" style={{ textDecoration: "none" }}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
  </Fragment>
);
