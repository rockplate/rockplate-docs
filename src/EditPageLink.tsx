import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: '30px',
    textAlign: 'right',
  },
}));

export interface EditPageLinkProps {
  path: string;
}

export default function EditPageLink(props: EditPageLinkProps) {
  const classes = useStyles();
  const url = 'https://github.com/rockplate/rockplate-docs/edit/master/' + props.path;
  return (
    <div className={classes.root}>
      <Link href={url} target="_blank" color="secondary">
        Edit this page
      </Link>
    </div>
  );
}
