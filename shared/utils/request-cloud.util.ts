import { AxiosResponse } from 'axios';
import { Observable, lastValueFrom, map } from 'rxjs';

export const requestCloudUtil = async <T = any>(
  source: Observable<AxiosResponse<T>>,
): Promise<T> => {
  return lastValueFrom(source.pipe(map((response) => response.data)));
};
