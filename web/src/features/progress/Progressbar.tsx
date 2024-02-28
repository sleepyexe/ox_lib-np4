import React from 'react';
import { Box, createStyles, Text } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { ProgressbarProps } from '../../typings';

const useStyles = createStyles((theme) => ({
  container: {
    width: 350,
    height: 10,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.dark[5],
    overflow: 'hidden',
  },
  wrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
  },
  bar: {
    height: '100%',
    backgroundColor: theme.colors[theme.primaryColor][theme.fn.primaryShade()],
  },
  labelWrapper: {
    justifyContent: 'space-between',
    width: '100%',
    display: 'flex',
    textTransform: 'capitalize',
    color: theme.colors.gray[1],
    textShadow: theme.shadows.sm,
  },
  label: {
    maxWidth: 350,
    padding: 8,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 20,
  },
}));

const Progressbar: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = React.useState(false);
  const [label, setLabel] = React.useState('');
  const [duration, setDuration] = React.useState(0);
  const [value, setValue] = React.useState(0);
  useNuiEvent('progressCancel', () => setVisible(false));

  useNuiEvent<ProgressbarProps>('progress', (data) => {
    if (visible) return;
    setVisible(true);
    setLabel(data.label);
    setDuration(data.duration);
    const onePercent = data.duration * 0.01;
    const updateProgress = setInterval(() => {
      setValue((prev) => {
        const newValue = prev + 1;
        newValue >= 100 && clearInterval(updateProgress);
        return newValue
      })
    }, onePercent)
  });

  return (
    <>
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
          <Box className={classes.labelWrapper}>
            <Text>{label}</Text>
            <Text>{value}%</Text>
          </Box>
          <Box style={{
            border: 'white',
            borderStyle: 'solid',
            padding: '10px',
            borderWidth: '1px'
            }}>
            <Box className={classes.container}>
              <Box
                className={classes.bar}
                onAnimationEnd={() => setVisible(false)}
                sx={{
                  animation: 'progress-bar linear',
                  animationDuration: `${duration}ms`,
                }}
              >
              </Box>
            </Box>
          </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default Progressbar;
