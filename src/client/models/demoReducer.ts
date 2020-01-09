interface IReducer {
  pageNumber: string;
  pageSize: string;
}

interface Iaction {
	type: string;
	stagecode?:number;
}

export const pageReducer = (state: IReducer, action: Iaction) => {
  switch (action.type) {
  case "STAGE_DATA":
    return {
      ...state,
      stagecode: action.stagecode
    };
  default:
    return state;
  }
};