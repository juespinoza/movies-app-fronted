import React from "react";
import { Icon } from "galio-framework";

export default function Stars({ cant }) {
    var res = [];

    for (let i = 1; i <= cant; i++) {
      res.push(
        <Icon
          key={Math.random()}
          family="font-awesome"
          size={20}
          name="star"
        />
      );
    }
    // console.log(cant%1);
    if (cant%1 != 0) {
        res.push(
            <Icon
            key={Math.random()}
            family="font-awesome"
            size={20}
            name="star-half-empty"
            />
      );
    }
    for (let i = 4; i >= cant; i--) {
        res.push(
          <Icon
            key={Math.random()}
            family="font-awesome"
            size={20}
            name="star-o"
          />
        );
    }

    return (res);
  };
