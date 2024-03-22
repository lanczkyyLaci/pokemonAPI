import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, any, any>>();
export default useAppDispatch;
