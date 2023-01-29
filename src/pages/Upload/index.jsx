import { UploadOutlined, RestOutlined } from '@ant-design/icons';
import { Button, message, Upload, Card, List } from 'antd';
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import request from '../../utils/request'


async function updateImage(url, { arg }) {
  const formData = new FormData();
  formData.append('file', arg);
  const res = await request.post(url, formData)
  return res
}

const fetcherImages = async (url) => {
  const res = await request.get(url)
  return res.data
}



const UploadView = () => {

  const { data, mutate, isValidating } = useSWR("/images/getAllImages", fetcherImages)
  const { trigger } = useSWRMutation('/images/upload', updateImage)

  const handleDownload = (item) => {
    fetch(`htt p://127.0.0.1:9527/images/DownLoadImage/${item.path}`, {
      responseType: 'arraybuffer',
      headers: {
        "token": localStorage.getItem('token')
      }
    }).then(response => response.blob())
      .then(res => {
        const url = window.URL.createObjectURL(res)
        const a = document.createElement("a")
        a.style.display = 'none'
        a.href = url
        a.download = item.path
        a.click()
        move()
      }).catch(err => {
        console.log('err', err);
      });
  }

  const customRequest = ({
    file,
    onError,
    onSuccess,
  }) => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await trigger(file, { controller })
        onSuccess();
        mutate()
        message.success(res.data);
      } catch (err) {
        // error handling
        console.log(err, 'err');
        onError();
        message.error(err.msg);
      }
    })()

    return {
      abort() {
        controller.abort()
        message.error('upload progress is aborted.');
      },
    }
  }

  return (
    <Card title={ `共计: ${data?.total || 0} 张` } loading={ isValidating }>
      <Upload customRequest={ customRequest } showUploadList={ false }>
        <Button icon={ <UploadOutlined /> }>Click to Upload</Button>
      </Upload>
      <Button icon={ <RestOutlined /> } onClick={ mutate } style={ { marginLeft: 20 } }>reset</Button>
      <List
        style={ { marginTop: 20 } }
        header={ <div>下载列表</div> }
        bordered
        dataSource={ data?.files }
        renderItem={ (item) => (
          <List.Item>
            <Button type="link" onClick={ () => handleDownload(item) } style={ { cursor: "pointer" } }>{ item.path }</Button>
          </List.Item>
        ) }
      />
    </Card >
  )
}

export default UploadView