import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(5)
});


interface ILoginProps {
    children: React.ReactNode;
}


export const Login: React.FC<ILoginProps> = ({children}) => {

    const { isAuthenticated, login } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    //Essa função pegará os valores inputados pelo usuário e os enviará para o Yup, para que ele possa validar o formato dos dados que o usuário está enviando.
    const handleEntrar = () => {

        setIsLoading(true);

        loginSchema.validate({
            email, password
        }, {abortEarly: false}).then(dadosValidados => {
            login(dadosValidados.email, dadosValidados.password)
            .then(() => {
                setIsLoading(false); //Apenas após a consulta ser realizada que o "isLoading" deixará de ser exibido.
            })
        }).catch((erros: yup.ValidationError) => {

            setIsLoading(false);

            erros.inner.forEach(erro => {
                if(erro.path == 'email'){
                    setEmailError(erro.message);
                }else if(erro.path === 'password'){
                    setPasswordError(erro.message)
                }
            })
        })
    }

    if(isAuthenticated) return (
        <>{children}</>
    )

    /**
     * A configuração do componente "<Box>" abaixo centralizará o componente que estiver dentro do "<Box>", e, além
     * disso, o "<Box>" ocupará a tela inteira.
     */
    return (
        <Box width='100vw' height='100vh' display='flex' alignItems="center" justifyContent="center">
            <Card>
                <CardContent>
                    <Box display='flex' flexDirection='column' gap={2} width={250}>
                        <Typography variant='h6' align='center'>
                            Identifique-se
                        </Typography>

                        <TextField label='Email'
                         type='email'
                          fullWidth
                          value={email}
                          disabled={isLoading}
                          onChange={e => setEmail(e.target.value)}
                          onKeyDown={() => setEmailError('')}
                          error={!!emailError}
                          helperText={emailError}/>

                        <TextField label='Senha'
                         type='password'
                          fullWidth
                          value={password}
                          disabled={isLoading}
                          onChange={e => setPassword(e.target.value)}
                          onKeyDown={() => setPasswordError('')}
                          error={!!passwordError}
                          helperText={passwordError}/>

                    </Box>
                </CardContent>
                <CardActions>
                    <Box width='100%' display='flex' justifyContent='center'>
                        <Button variant='contained'
                        disabled={isLoading}
                        onClick={handleEntrar}
                        endIcon={isLoading ? <CircularProgress size={25} variant='indeterminate'/> : undefined}>
                            Entrar
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    )
}