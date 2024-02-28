import React from 'react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { Box, createStyles, Group } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import ScaleFade from '../../transitions/ScaleFade';
import remarkGfm from 'remark-gfm';
import type { TextUiPosition, TextUiProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';
import LibIcon from '../../components/LibIcon';

const useStyles = createStyles((theme, params: { position?: TextUiPosition }) => ({
  wrapper: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: params.position === 'top-center' ? 'baseline' : 'center',
    justifyContent:
      params.position === 'right-center' ? 'flex-end' : params.position === 'left-center' ? 'flex-start' : 'center',
  },
  container: {
    fontSize: 16,
    padding: 12,
    margin: 8,
    width: 300,
    color: theme.colors.dark[0],
    fontFamily: 'Roboto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 8,
    borderRadius: theme.radius.sm,
  },
  separator: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  titleContainer : {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 5,
  },
  title: {
    color: 'lime-green',
    fontFamily: 'Roboto',
    fontSize: '20px',
    fontWeight: 'bold',
    textShadow: '0 0 5px #50bcaf40, 0 0 5px #50bcaf40, 0 0 5px #50bcaf40, 0 0 5px #50bcaf40'
  },
  shape: {
    width: '100%',
    height: '5px',
    display: 'block',
    borderRadius: '20%',
    background: 'linear-gradient(90deg, rgba(255,255,255,0.014443277310924318) 0%, rgba(140,140,140,1) 33%, rgba(181,181,181,1) 66%, rgba(255,255,255,0) 100%)'
  },
  shape2: {
    display: 'block',
    width: '30%',
    height: '5px',
    margin: 'auto',
    marginTop: -5,
    boxShadow: '0 0 5px #50bcaf40, 0 0 5px #50bcaf40, 0 0 5px #50bcaf40, 0 0 5px #50bcaf40',
    background: 'rgb(63, 224, 152)',
  },
  contentContainer: {
    fontFamily: 'Roboto',
    borderRadius: 5,
    backgroundColor: 'rgba(109, 109, 109, 0.397)',
    padding: '5%',
    color: 'white',
    border: '1px solid rgb(128, 128, 128)',
  }
}));

const TextUI: React.FC = () => {
  const [data, setData] = React.useState<TextUiProps>({
    title: '',
    text: '',
    position: 'left-center',
  });
  const [visible, setVisible] = React.useState(false);
  const { classes } = useStyles({ position: data.position });

  useNuiEvent<TextUiProps>('textUi', (data) => {
    if (!data.position) data.position = 'right-center'; // Default right position
    setData(data);
    setVisible(true);
  });

  useNuiEvent('textUiHide', () => setVisible(false));

  return (
    <>
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible}>
          <Box style={data.style} className={classes.container}>
            <Group spacing={12} className={classes.titleContainer}>
              {data.icon && (
                <LibIcon
                  icon={data.icon}
                  fixedWidth
                  size="lg"
                  animation={data.iconAnimation}
                  style={{
                    color: data.iconColor || 'white',
                    alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start',
                  }}
                />
              )}
              <div className={classes.title}>
                {data.title}
              </div>
            </Group>
            <Group spacing={0}>
                <Box className={classes.shape}></Box>
                <Box className={classes.shape2}></Box>
            </Group>
            <Group spacing={12} className={classes.contentContainer}>
              <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
                {data.text}
              </ReactMarkdown>
            </Group>
          </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default TextUI;
