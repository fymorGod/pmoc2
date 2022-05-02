import axios from 'axios';
import { useState, useEffect } from 'react';

export function useFecth <T = unknown>(url: string) {
    const [ data, setData ] = useState<T | null>(null)

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setData(response.data);
            })
    })
    return { data }
}