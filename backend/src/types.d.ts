export interface StartServerProps {
  app: Express;
  PORT: number;
}

export interface ErrorResponse {
  error: string;
}

export interface EncryptBcryptParams {
  data: string;
  saltRounts: number;
}

export interface CompareBcryptParams {
  data: string;
  hash: string;
}

export interface SimetrycEncryptParams {
  data: string;
  keyDecrypt: string;
}

export interface TSGooseHandlerProps {
  private connectionString: string;
}

export type ClazzT<T> = new () => T;

export interface CreateModelParams<T> {
  clazz: ClazzT<T>;
}

type DefineModelSchemasType = BasePropOptions | ArrayPropOptions | MapPropOptions | PropOoptionsForNumber | VirtualOptions | undefined

export interface DefineModelParams<T> {
  name: string;
  schema: Record<string, DefineModelSchemasType>;
}

export interface AddDocumentParams<T> {
  Model: ReturnModelType<ClazzT<T>>;
  data: T;
}

export interface RemoveDocumentParams<T> {
  Model: ReturnModelType<ClazzT<T>>;
  id: string;
}

export interface EditDocumentParams<T> {
  Model: ReturnModelType<ClazzT<T>>;
  id: string;
  newData: Partial<T>;
}

export interface SearchIdParams<T> {
  Model: ReturnModelType<ClazzT<T>>;
  id: string;
}

export interface SearchAll<T>{
  Model: ReturnModelType<ClazzT<T>>
}

export interface SearchRelationsParams<T>{
  Model: ReturnModelType<ClazzT<T>>,
    id?: string ,
    relationField: string
}