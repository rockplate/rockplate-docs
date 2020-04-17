import React from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Grid from '@material-ui/core/Grid';
import NextLink from 'next/link';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: '30px',
    // maxWidth: 400,
    // flexGrow: 1,
  },
  container: {
    marginTop: '15px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));

export interface FooterLinksProp {
  step?: number;
  prev?: { link: string; label: string };
  next?: { link: string; label: string };
}

export default function FooterLinks(props: FooterLinksProp) {
  const classes = useStyles();
  const activeStep = props.step || 0;
  const totalSteps = 6;
  const progress = (activeStep / totalSteps) * 100;
  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={progress} />
      <Grid container spacing={1} className={classes.container}>
        <Grid item xs={12} sm={6} md={6}>
          {props.prev ? (
            <NextLink href={props.prev.link} passHref>
              <Button color="primary" style={{ textTransform: 'none' }} component="a" size="small">
                <KeyboardArrowLeft />
                {props.prev.label}
              </Button>
            </NextLink>
          ) : (
            <div></div>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={6} style={{ textAlign: 'right' }}>
          {props.next ? (
            <NextLink href={props.next.link} passHref>
              <Button color="primary" style={{ textTransform: 'none' }} component="a" size="small">
                {props.next.label}
                <KeyboardArrowRight />
              </Button>
            </NextLink>
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
export function FooterLinksOld(props: FooterLinksProp) {
  const classes = useStyles();
  const theme = useTheme();
  //   const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const activeStep = props.step || 0;
  const totalSteps = 7;

  return (
    <MobileStepper
      variant="progress"
      steps={totalSteps}
      position="static"
      activeStep={activeStep}
      className={classes.root}
      nextButton={
        props.next ? (
          <NextLink href={props.next.link} passHref>
            <Button component="a" size="small" onClick={handleNext} disabled={activeStep === totalSteps - 1}>
              {props.next.label}
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          </NextLink>
        ) : (
          <div></div>
        )
      }
      backButton={
        props.prev ? (
          <NextLink href={props.prev.link} passHref>
            <Button component="a" size="small" onClick={handleNext} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              {props.prev.label}
            </Button>
          </NextLink>
        ) : (
          <div></div>
        )
      }
    />
  );
}
