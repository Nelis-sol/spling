import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography, { TypographyProps } from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AvatarSelector, { FileData } from 'react-avatar-selector'
import { Keypair } from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { ShdwDrive, StorageAccountResponse } from '@shadow-drive/sdk'

function Copyright(props: TypographyProps) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Spling
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default function SignUp() {
  const { connection } = useConnection()
  const wallet = useWallet()

  const [image, _setImage] = useState<FileData>()
  const [drive, setDrive] = useState<ShdwDrive>()
  const [acc, setAcc] = useState<StorageAccountResponse>()

  useEffect(() => {
    ;(async () => {
      if (wallet?.publicKey) {
        const drive = await new ShdwDrive(connection, wallet).init()
        await setDrive(drive)
      }
    })()
  }, [wallet?.publicKey])

  /* useEffect(() => {
    ;(async () => {
      if (drive) {
        const accounts = await drive?.getStorageAccounts('v2')
        setAcc(accounts[0])
      }
    })()
  }, [drive])
  */

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const userProfileJson = {
      name: data.get('username'),
      bio: data.get('biography'), // TODO: Replace with the bio text file url.
      avatar: 'shadowUrl/avatar.png', // TODO: Replace with the avatar iamge url.
      hash: Keypair.generate().publicKey,
    }
    console.log(userProfileJson)

    /* try {
      const deleteResponse = await drive?.deleteFile(
        acc!.publicKey!,
        'https://shdw-drive.genesysgo.net/7QMbyYU2CBkswKxKjZLdsEhLDH41cmEZJXyYWM3CbdeG/userprofile.json',
        'v2',
      )
      console.log(deleteResponse)

      const fileToSave = new Blob([JSON.stringify(userProfileJson)], {
        type: 'application/json',
      })
      const generatedUserProfileFile = new File([fileToSave], 'userprofile.json')
      const uploadResponse = await drive?.uploadFile(
        acc!.publicKey!,
        generatedUserProfileFile,
        'v2',
      )
      console.log(uploadResponse)
    } catch (e) {
      console.log(e)
    }
    */
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid container item xs={12} justifyContent='center'>
                <AvatarSelector onChange={(value) => _setImage(value)} value={image} size={100} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name='username'
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  name='biography'
                  label='Biography'
                  type='text'
                  id='password'
                />
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Create Account
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}
