import api, { backURL } from '@/services/api';
import handleError from '@/utils/handleToast';

interface Props {
  event?: React.MouseEvent<HTMLButtonElement>;
  pathDoc: string;
}

const useDocDownload = () => {
  const DocDownload = async ({ event, pathDoc }: Props) => {
    if (event) {
      event.preventDefault();
    }

    try {
      const url = `${backURL}${pathDoc}`;

      const response = await api.get(url, { responseType: 'blob' });

      const blob = response.data;
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = url.split('/').pop() || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      handleError(error);
    }
  };

  return { DocDownload };
};

export default useDocDownload;
