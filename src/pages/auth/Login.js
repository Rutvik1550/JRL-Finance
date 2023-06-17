import { capitalCase } from 'change-case';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Tooltip, Container, Typography } from '@mui/material';
// routes
import { useState } from 'react';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Image from '../../components/Image';
// sections
import { LoginForm } from '../../sections/auth/login';
import VerifyCode from './VerifyCode';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

// const HeaderStyle = styled('header')(({ theme }) => ({
//   top: 0,
//   zIndex: 9,
//   lineHeight: 0,
//   width: '100%',
//   display: 'flex',
//   alignItems: 'center',
//   position: 'absolute',
//   padding: theme.spacing(3),
//   justifyContent: 'space-between',
//   [theme.breakpoints.up('md')]: {
//     alignItems: 'flex-start',
//     padding: theme.spacing(7, 5, 0, 7),
//   },
// }));

const SectionStyle = styled(Card)(() => ({
  width: '100%',
  maxWidth: '50vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: 0,
  height: '100vh',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: '50wh',
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 5),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState(null);

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <RootStyle>
        {mdUp && (
          <SectionStyle>
            <Image visibleByDefault disabledEffect src="/assets/login/login_page-img.png" alt="login" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          {!phoneNumber ? (
            <ContentStyle>
              <Stack direction="column" alignItems="center" sx={{ mb: 5 }}>
                <Tooltip title={capitalCase(method)} placement="right">
                  <>
                    <Image src={`/logo/logo_jrl.svg`} sx={{ width: 134, height: 60 }} />
                  </>
                </Tooltip>
                <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography variant="h2" mt={5} gutterBottom>
                    Welcome back!
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: '20px' }}>
                    Start managing your finance faster & better
                  </Typography>
                  <Typography sx={{ fontSize: '20px' }}>
                    New user?{' '}
                    <Typography component={'span'} sx={{ color: '#1E7CF3', fontWeight: 700 }}>
                      Create an account
                    </Typography>
                  </Typography>
                </Box>
              </Stack>

              <LoginForm phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
            </ContentStyle>
          ) : (
            <VerifyCode phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
          )}
        </Container>
      </RootStyle>
    </Page>
  );
}
