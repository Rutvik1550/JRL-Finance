/* eslint-disable import/no-unresolved */
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Stack } from '@mui/material';
// layouts
import PropTypes from 'prop-types';
import Image from 'src/components/Image';
// sections
import { VerifyCodeForm } from '../../sections/auth/verify-code';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

VerifyCode.propTypes = {
  phoneNumber: PropTypes.string,
};

export default function VerifyCode({ phoneNumber }) {
  return (

      <>
        <ContentStyle sx={{ textAlign: 'center' }}>
        <Stack direction="column" alignItems="center">
          <Image src={`/logo/logo_jrl.svg`} sx={{ width: 134, height: 60 }} />
          {/* <Button
            size="small"
            onClick={() => setPhoneNumber(null)}
            startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />}
            sx={{ mb: 3 }}
          >
            Back
          </Button> */}
          <Typography variant="h3" paragraph>
            Please Verify OTP
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            We have sent you a 6 digit confirmation code to <br />
            +91 {phoneNumber?.slice(0, 2)}*** ***{phoneNumber?.slice(phoneNumber.length - 3, phoneNumber.length - 1)},
            please enter the code in below box to <br />
            verify your Number.
          </Typography>
          </Stack>

          <Box sx={{ mt: 2, mb: 3 }}>
            <VerifyCodeForm phoneNumber={phoneNumber} />
          </Box>

          {/* <Typography variant="body2">
            Don’t have a code? &nbsp;
            <Link variant="subtitle2" onClick={() => {}}>
              Resend code
            </Link>
          </Typography> */}
        </ContentStyle>
      </>
  );
}
