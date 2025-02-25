import { useContext } from 'react';
import { IconButton, Link, Tooltip } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import WebIcon from '@mui/icons-material/Web';

import { DiscordIcon, TwitchIcon } from 'components/Icons/Icons';
import { GuildsContext } from 'pages/Guilds/GuildsContext';

import { guildSocialsStyles } from '../styles';

export function GuildSocials() {
  const classes = guildSocialsStyles();

  const { guildId, guilds } = useContext<any>(GuildsContext);

  const socials: any = {
    facebook: <FacebookIcon className={classes.guildSocialIcon} />,
    twitter: <TwitterIcon className={classes.guildSocialIcon} />,
    discord: <DiscordIcon className={classes.guildSocialIcon} />,
    telegram: <TelegramIcon className={classes.guildSocialIcon} />,
    twitch: <TwitchIcon className={classes.guildSocialIcon} />,
    default: <WebIcon className={classes.guildSocialIcon} />
  };

  const renderSocials = (): JSX.Element | JSX.Element[] => {
    const guild: any = guilds[guildId];

    if (guild === undefined || !guild.hasOwnProperty('socials')) {
      return <></>;
    }

    return Object.keys(guild.socials).map(key => (
      <Tooltip title={key} key={key} placement='top' followCursor>
        <IconButton component={Link} href={guild.socials[key]} target='_blank' className={classes.guildSocialButton}>
          {socials[key] || socials.default}
        </IconButton>
      </Tooltip>
    ));
  };

  return <div className={classes.guildSocials}>{renderSocials()}</div>;
}
