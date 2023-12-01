import  { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../index.css'
import { ResponseTracking } from '../../types';
import dayjs from 'dayjs';
import CurrencyFormatter from '../../helper/currencyFromatter';

const Tracking: React.FC = () => {
  const [orderData, setOrderData] = useState<ResponseTracking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showInputPhone, setShowInputPhone] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const path = window.location.pathname;
        const orderId = path.substring(path.lastIndexOf('/') + 1);
        const response: AxiosResponse<ResponseTracking> = await axios.get(`https://bandulan-api.cid.co.id/api/v1/track-orders/${orderId}`);
        const data: ResponseTracking = response.data;
        setOrderData(data);
      } catch (error) {
        setError('Maaf terjadi kesalahan, silahkan coba lagi');
      }
    };

    fetchOrderData();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error])

  const fetchTerimaPengiriman = async () => {
    setLoading(true)
    try {
      const path = window.location.pathname;
      const orderId = path.substring(path.lastIndexOf('/') + 1);
      const param = {
        customer_phone_number : phone
      }
      const response: AxiosResponse<ResponseTracking> = await axios.put(`https://bandulan-api.cid.co.id/api/v1/track-orders/${orderId}/claim`, param);
      const data: ResponseTracking = response.data;
      setLoading(false)
      setOrderData(data);
    } catch (error) {
        toast.error('Maaf Nomor yang anda masukkan salah')
      setLoading(false)
    }
  };

  return (
    <>
        <div className="min-h-screen py-10 bg-slate-50">
          <div className=" bg-white p-6 md:p-10 rounded-lg shadow-md max-w-full mx-4 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl sm:mx-auto">
            <h6 className=" text-2xl font-semibold text-slate-800 mb-10">Tracking Pengiriman</h6>
              <div  className="flex flex-col sm:flex-row justify-between items-start mt-6 mb-10">
                  <div className="text-base text-slate-950">
                      <p className="mb-3 font-semibold"><span className="text-slate-800 font-normal text-base mb-4">Nomor Pemesanan</span> <br/>{orderData?.data?.so_number ?? '-'}</p>
                      <p className="mb-3 font-medium"><span className="text-slate-800 font-normal text-base mb-4">Tanggal Pemesanan :</span> <br/>{dayjs(orderData?.data?.order_date).format('DD MMM YYYY HH:MM') ?? '-'}</p>
                      <p className="mb-3 font-medium"><span className="text-slate-800 font-normal text-base mb-4">Tanggal di Kirim :</span> <br/>{dayjs(orderData?.data?.delivery_date).format('DD MMM YYYY HH:MM') ?? '-'}</p>
                      <p className="mb-3 font-medium"><span className="text-slate-800 font-normal text-base mb-4">Total Pembayaran :</span> <br/>{CurrencyFormatter(Number(orderData?.data?.total_payment)) ?? '-'}</p>
                  </div>

                  <div className="text-base text-slate-950">
                      <p className="mb-3 font-semibold"><span className="text-slate-800 font-normal text-base mb-4">Nama Driver :</span> <br/> {orderData?.data?.driver?.name ?? '-'}</p>
                      <p className="mb-3 font-medium"><span className="text-slate-800 font-normal text-base mb-10">Telepon  Driver:</span> <br/>{orderData?.data?.driver?.phone_number ?? ''}</p>
                      <p className="mb-3 font-medium mt-6"><span className="text-slate-800 font-normal text-base ">Status : </span><span className='p-2 rounded-md bg-slate-100 font-medium  ml-3 uppercase'>{orderData?.data?.status ?? '-'}</span></p>

                  </div>

                  <div className="text-base text-slate-950">
                      <p className="mb-3 font-semibold"><span className="text-slate-800 font-normal text-base mb-4">Kendaraan :</span> <br/> {orderData?.data?.vehicle?.name ?? '-'}</p>
                      <p className="mb-3 font-medium"><span className="text-slate-800 font-normal text-base mb-4">Plat Nomor :</span> <br/>{orderData?.data?.vehicle?.license_plate ?? '-'}</p>
                  </div>
              </div>
              <div className="border rounded-md mb-10 p-6  overflow-x-auto">
                  <h6 className="mb-6 text-xl font-semibold text-slate-800">Tabel Item</h6>
                  <div className="min-w-[600px]">
                    <table  className="border-collapse w-full mb-2 text-slate-800 ">
                        <thead>
                            <tr className='bg-slate-50 '>
                                <th className='font-medium py-2 text-left px-3'>Nama Barang</th>
                                <th className='font-medium py-2 px-3'>Jumlah / Satuan</th>
                                <th className='font-medium py-2 px-3'>Harga / Satuan</th>
                                <th className='font-medium py-2 px-3'>Jumlah / Pcs</th>
                                <th className='font-medium py-2 px-3'>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                          orderData?.data?.items.map((item, key) => (
                            <tr className='' key={key}>
                              <td className='text-left px-3'>{item?.inventory_name ?? '-'}</td>
                              <td className='text-center px-3'>{item?.quantity_unit + ' ' + item?.unit}</td>
                              <td className='text-center px-3'>{item?.quantity_pcs + ' Pcs'}</td>
                              <td className='text-center px-3'>{CurrencyFormatter(item?.unit_price) + '/'+ item?.unit}</td>
                              <td className='text-center px-3'>{CurrencyFormatter(item?.subtotal)}</td>
                          </tr>
                          ))
                        }
                        </tbody>
                    </table>
                  </div>
              </div>
              {
                !showInputPhone && (
                    <button className=" text-white text-base font-medium bg-emerald-700 rounded-md py-4 px-10" onClick={() => setShowInputPhone(true)}>
                        Terima Pengiriman
                    </button>
                )
              }
              
              {
                showInputPhone && (
                    <>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="nomer_telepon" className='text-base text-slate-900'>Nomer Telepon</label>
                                <input id='nomer_telepon' maxLength={13} className='bg-slate-50 border border-slate-400 px-4 py-3 inline rounded-lg w-60 text-slate-900' type="text" onChange={(e) => setPhone(e.target.value)} placeholder='Nomer Telepon Anda'/>
                            </div>
                            <div className="">
                                <button className={` text-white text-base font-medium bg-emerald-700 rounded-md py-4 px-10 w-32 ${phone.length < 11 || loading ? 'opacity-50' : 'opacity-100'}`} disabled={phone.length < 11 || loading} onClick={fetchTerimaPengiriman}>
                                {loading ? 'Loading..' : 'Submit'}
                                </button>
                            </div>
                        </div>
                    </>
                )
              }
          </div>
        </div>
        <ToastContainer />
    </>
  )
}

export default Tracking;
