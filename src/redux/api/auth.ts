import { api } from "./index";
import { LoginRequest, LoginResponse } from "../../types";
import { AppDispatch } from "..";
import type { BaseQueryResult } from "@reduxjs/toolkit/query";

const invalidateCustomerTag = async (
  queryFulfilled: Promise<BaseQueryResult<any>>,
  dispatch: AppDispatch
) => {
  try {
    await queryFulfilled;
    dispatch(extendedApi.util.invalidateTags(["Auth", "User"]));
  } catch (error) {
    console.error("Error:", error);
  }
};

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    signInUser: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
  }),
  overrideExisting: false,
});

export const { useSignInUserMutation } = extendedApi;
