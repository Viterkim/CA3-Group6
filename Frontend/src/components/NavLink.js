/**
 * Created by scheldejonas on 04/04/2017.
 */
import React from 'react';
import { Link } from 'react-router';

const NavLink = props => (
  <Link {...props} activeClassName="active" />
);

export default NavLink;