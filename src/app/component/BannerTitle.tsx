import React from "react";
import AppButton from "./common/AppButton";

export default function BannerTitle() {
  return (
    <div className="pt-32">
      <div className="text-center mx-auto">
        <AppButton title="Personal Growth" />
        <h1 className="text-4xl md:text-8xl font-bold text-[#303A46] my-6">
          Feel more <br /> human every day
        </h1>
        <AppButton
          className="px-[30px] bg-[#D3EFA2]! hover:bg-[#B7DB7D] py-4"
          title="Request demo"
        />
      </div>
    </div>
  );
}
