import axios from 'lib/axios';

export const user = async () => {
    const { data } = await axios.get('/user');

    return data;
};

export const login = (payload: any) => axios.post('/login', payload);

export const logout = () => axios.delete('/logout');
