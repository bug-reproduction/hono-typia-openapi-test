import * as hono_hono_base from "hono/hono-base";
import * as hono_types from "hono/types";
import { Bindings } from "hono/types";
import * as hono_utils_http_status from "hono/utils/http-status";
import * as hono_utils_types from "hono/utils/types";
import * as hono from "hono";

export type App = hono_hono_base.HonoBase<
  hono_utils_types.IfAnyThenEmptyObject<
    hono_utils_types.IfAnyThenEmptyObject<
      {
        Bindings: Bindings & {};
      } extends infer T
        ? T extends {
            Bindings: Bindings & {};
          }
          ? T extends hono.Env
            ? hono.Env extends T
              ? {}
              : T
            : T
          : never
        : never
    > & {} extends infer T_1
      ? T_1 extends hono_utils_types.IfAnyThenEmptyObject<
          {
            Bindings: Bindings & {};
          } extends infer T
            ? T extends {
                Bindings: Bindings & {};
              }
              ? T extends hono.Env
                ? hono.Env extends T
                  ? {}
                  : T
                : T
              : never
            : never
        > & {}
        ? T_1 extends hono.Env
          ? hono.Env extends T_1
            ? {}
            : T_1
          : T_1
        : never
      : never
  > & {},
  | {
      "*":
        | {}
        | {
            $get: {
              input: {};
              output: "fuzd api";
              outputFormat: "text";
              status: hono_utils_http_status.StatusCode;
            };
          };
    }
  | hono_types.MergeSchemaPath<
      {
        "/publicKey": {
          $get: {
            input: {};
            output: string;
            outputFormat: "text";
            status: hono_utils_http_status.StatusCode;
          };
        };
      } & {
        "/paymentAccountBroadcaster": {
          $get: {
            input: {};
            output: {
              paymentAccountBroadcaster: {
                address: `0x${string}`;
                privateKey: `0x${string}`;
                publicKey: `0x${string}`;
                publicExtendedKey: string;
                deriveForAddress: {};
              } | null;
            };
            outputFormat: "json";
            status: hono_utils_http_status.StatusCode;
          };
        };
      } & {
        "/time/:chainId": {
          $get: {
            input: {
              param: {
                chainId: string;
              };
            };
            output: {
              timestamp: number;
            };
            outputFormat: "json";
            status: hono_utils_http_status.StatusCode;
          };
        };
      } & {
        "/contractTimestamp": {
          $get: {
            input: {};
            output: {
              timeContract: `0x${string}` | undefined;
            };
            outputFormat: "json";
            status: hono_utils_http_status.StatusCode;
          };
        };
      },
      "/api"
    >
  | hono_types.MergeSchemaPath<
      {
        "/processQueue": {
          $get: {
            input: {};
            output: {
              limit: number;
              executions: {
                chainId: string;
                account: `0x${string}`;
                slot: string;
                checkinTime: number;
                status: {
                  type:
                    | "unknown"
                    | "deleted"
                    | "broadcasted"
                    | "archived"
                    | "reassigned"
                    | "skipped"
                    | "finalized";
                  reason: string;
                };
              }[];
              chainTimetamps: {
                [x: string]: number;
              };
            };
            outputFormat: "json";
            status: hono_utils_http_status.StatusCode;
          };
        };
      } & {
        "/checkScheduledExecutionStatus": {
          $get: {
            input: {};
            output: {
              limit: number;
              executions: {
                chainId: string;
                account: `0x${string}`;
                slot: string;
                checkinTime: number;
                status: {
                  type:
                    | "unknown"
                    | "deleted"
                    | "broadcasted"
                    | "archived"
                    | "reassigned"
                    | "skipped"
                    | "finalized";
                  reason: string;
                };
              }[];
              chainTimetamps: {
                [x: string]: number;
              };
            };
            outputFormat: "json";
            status: hono_utils_http_status.StatusCode;
          };
        };
      } & {
        "/processTransactions": {
          $get: {
            input: {};
            output: {
              ok: boolean;
            };
            outputFormat: "json";
            status: hono_utils_http_status.StatusCode;
          };
        };
      },
      "/api/internal"
    >
  | hono_types.MergeSchemaPath<
      {
        "/scheduleExecution": {
          $post: {
            input: {
              json:
                | {
                    type: "time-locked";
                    chainId: `0x${string}`;
                    slot: string;
                    payload: string;
                    timing:
                      | {
                          type: "fixed-time";
                          scheduledTime: number;
                          expiry?: number | undefined;
                          assumedTransaction?:
                            | {
                                hash: `0x${string}`;
                                nonce: `0x${string}`;
                                broadcastTime: number;
                              }
                            | undefined;
                        }
                      | {
                          type: "fixed-round";
                          scheduledRound: number;
                          expectedTime: number;
                          expiry?: number | undefined;
                          assumedTransaction?:
                            | {
                                hash: `0x${string}`;
                                nonce: `0x${string}`;
                                broadcastTime: number;
                              }
                            | undefined;
                        };
                    onBehalf?: `0x${string}` | undefined;
                    paymentReserve?: string | undefined;
                  }
                | {
                    type: "clear";
                    executions: any[];
                    chainId: `0x${string}`;
                    slot: string;
                    timing:
                      | {
                          type: "delta-time";
                          startTransaction: {
                            hash: `0x${string}`;
                            nonce: `0x${string}`;
                            broadcastTime: number;
                          };
                          delta: number;
                          expiry?: number | undefined;
                        }
                      | {
                          type: "fixed-time";
                          scheduledTime: number;
                          expiry?: number | undefined;
                          assumedTransaction?:
                            | {
                                hash: `0x${string}`;
                                nonce: `0x${string}`;
                                broadcastTime: number;
                              }
                            | undefined;
                        }
                      | {
                          type: "fixed-round";
                          scheduledRound: number;
                          expectedTime: number;
                          expiry?: number | undefined;
                          assumedTransaction?:
                            | {
                                hash: `0x${string}`;
                                nonce: `0x${string}`;
                                broadcastTime: number;
                              }
                            | undefined;
                        };
                    onBehalf?: `0x${string}` | undefined;
                    paymentReserve?: string | undefined;
                  };
            };
            output: {
              chainId: `0x${string}`;
              slot: string;
              checkinTime: number;
              account: `0x${string}`;
            };
            outputFormat: "json";
            status: hono_utils_http_status.StatusCode;
          };
        };
      } & {
        "/reserved/:chainId/:account/:slot": {
          $get: {
            input: {
              param: {
                account: string;
              } & {
                chainId: string;
              } & {
                slot: string;
              };
            };
            output: {
              total: string;
            };
            outputFormat: "json";
            status: hono_utils_http_status.StatusCode;
          };
        };
      } & {
        "/queuedExecution/:chainId/:account/:slot": {
          $get: {
            input: {
              param: {
                account: string;
              } & {
                chainId: string;
              } & {
                slot: string;
              };
            };
            output: never;
            outputFormat: "json";
            status: hono_utils_http_status.StatusCode;
          };
        };
      } & {
        "/queuedExecution/:chainId/:account": {
          $get: {
            input: {
              param: {
                account: string;
              } & {
                chainId: string;
              };
            };
            output: (
              | {
                  type: "time-locked";
                  chainId: `0x${string}`;
                  slot: string;
                  payload: string;
                  timing:
                    | {
                        type: "fixed-time";
                        scheduledTime: number;
                        expiry?: number | undefined;
                        assumedTransaction?:
                          | {
                              hash: `0x${string}`;
                              nonce: `0x${string}`;
                              broadcastTime: number;
                            }
                          | undefined;
                      }
                    | {
                        type: "fixed-round";
                        scheduledRound: number;
                        expectedTime: number;
                        expiry?: number | undefined;
                        assumedTransaction?:
                          | {
                              hash: `0x${string}`;
                              nonce: `0x${string}`;
                              broadcastTime: number;
                            }
                          | undefined;
                      };
                  onBehalf?: `0x${string}` | undefined;
                  paymentReserve?: string | undefined;
                  account: `0x${string}`;
                  broadcasted: boolean;
                  finalized: boolean;
                  checkinTime: number;
                  retries: number;
                  priorTransactionConfirmation?:
                    | {
                        blockTime: number;
                        startTime?: number | undefined;
                      }
                    | undefined;
                  expectedWorstCaseGasPrice?: string | undefined;
                }
              | {
                  type: "clear";
                  executions: {
                    chainId: `0x${string}`;
                    derivationParameters: {
                      type: string;
                      data: any;
                    };
                    transaction: {
                      type: "0x2";
                      to?: `0x${string}` | undefined;
                      gas: `0x${string}`;
                      data?: `0x${string}` | undefined;
                      value?: `0x${string}` | undefined;
                      accessList?:
                        | {
                            address: `0x${string}`;
                            storageKeys: [`0x${string}`, ...`0x${string}`[]];
                          }[]
                        | undefined;
                    };
                    maxFeePerGasAuthorized: `0x${string}`;
                    expiryTime?: number | undefined;
                    onBehalf?: `0x${string}` | undefined;
                  }[];
                  chainId: `0x${string}`;
                  slot: string;
                  timing:
                    | {
                        type: "delta-time";
                        startTransaction: {
                          hash: `0x${string}`;
                          nonce: `0x${string}`;
                          broadcastTime: number;
                        };
                        delta: number;
                        expiry?: number | undefined;
                      }
                    | {
                        type: "fixed-time";
                        scheduledTime: number;
                        expiry?: number | undefined;
                        assumedTransaction?:
                          | {
                              hash: `0x${string}`;
                              nonce: `0x${string}`;
                              broadcastTime: number;
                            }
                          | undefined;
                      }
                    | {
                        type: "fixed-round";
                        scheduledRound: number;
                        expectedTime: number;
                        expiry?: number | undefined;
                        assumedTransaction?:
                          | {
                              hash: `0x${string}`;
                              nonce: `0x${string}`;
                              broadcastTime: number;
                            }
                          | undefined;
                      };
                  onBehalf?: `0x${string}` | undefined;
                  paymentReserve?: string | undefined;
                  account: `0x${string}`;
                  broadcasted: boolean;
                  finalized: boolean;
                  checkinTime: number;
                  retries: number;
                  priorTransactionConfirmation?:
                    | {
                        blockTime: number;
                        startTime?: number | undefined;
                      }
                    | undefined;
                  expectedWorstCaseGasPrice?: string | undefined;
                }
            )[];
            outputFormat: "json";
            status: hono_utils_http_status.StatusCode;
          };
        };
      },
      "/api/scheduling"
    >
  | hono_types.MergeSchemaPath<hono_types.BlankSchema, "/api/execution">
  | hono_types.MergeSchemaPath<
      | hono_types.BlankSchema
      | hono_types.MergeSchemaPath<
          {
            "/queue": {
              $get: {
                input: {};
                output: (
                  | {
                      type: "time-locked";
                      chainId: `0x${string}`;
                      slot: string;
                      payload: string;
                      timing:
                        | {
                            type: "fixed-time";
                            scheduledTime: number;
                            expiry?: number | undefined;
                            assumedTransaction?:
                              | {
                                  hash: `0x${string}`;
                                  nonce: `0x${string}`;
                                  broadcastTime: number;
                                }
                              | undefined;
                          }
                        | {
                            type: "fixed-round";
                            scheduledRound: number;
                            expectedTime: number;
                            expiry?: number | undefined;
                            assumedTransaction?:
                              | {
                                  hash: `0x${string}`;
                                  nonce: `0x${string}`;
                                  broadcastTime: number;
                                }
                              | undefined;
                          };
                      onBehalf?: `0x${string}` | undefined;
                      paymentReserve?: string | undefined;
                      account: `0x${string}`;
                      broadcasted: boolean;
                      finalized: boolean;
                      checkinTime: number;
                      retries: number;
                      priorTransactionConfirmation?:
                        | {
                            blockTime: number;
                            startTime?: number | undefined;
                          }
                        | undefined;
                      expectedWorstCaseGasPrice?: string | undefined;
                    }
                  | {
                      type: "clear";
                      executions: {
                        chainId: `0x${string}`;
                        derivationParameters: {
                          type: string;
                          data: any;
                        };
                        transaction: {
                          type: "0x2";
                          to?: `0x${string}` | undefined;
                          gas: `0x${string}`;
                          data?: `0x${string}` | undefined;
                          value?: `0x${string}` | undefined;
                          accessList?:
                            | {
                                address: `0x${string}`;
                                storageKeys: [
                                  `0x${string}`,
                                  ...`0x${string}`[]
                                ];
                              }[]
                            | undefined;
                        };
                        maxFeePerGasAuthorized: `0x${string}`;
                        expiryTime?: number | undefined;
                        onBehalf?: `0x${string}` | undefined;
                      }[];
                      chainId: `0x${string}`;
                      slot: string;
                      timing:
                        | {
                            type: "delta-time";
                            startTransaction: {
                              hash: `0x${string}`;
                              nonce: `0x${string}`;
                              broadcastTime: number;
                            };
                            delta: number;
                            expiry?: number | undefined;
                          }
                        | {
                            type: "fixed-time";
                            scheduledTime: number;
                            expiry?: number | undefined;
                            assumedTransaction?:
                              | {
                                  hash: `0x${string}`;
                                  nonce: `0x${string}`;
                                  broadcastTime: number;
                                }
                              | undefined;
                          }
                        | {
                            type: "fixed-round";
                            scheduledRound: number;
                            expectedTime: number;
                            expiry?: number | undefined;
                            assumedTransaction?:
                              | {
                                  hash: `0x${string}`;
                                  nonce: `0x${string}`;
                                  broadcastTime: number;
                                }
                              | undefined;
                          };
                      onBehalf?: `0x${string}` | undefined;
                      paymentReserve?: string | undefined;
                      account: `0x${string}`;
                      broadcasted: boolean;
                      finalized: boolean;
                      checkinTime: number;
                      retries: number;
                      priorTransactionConfirmation?:
                        | {
                            blockTime: number;
                            startTime?: number | undefined;
                          }
                        | undefined;
                      expectedWorstCaseGasPrice?: string | undefined;
                    }
                )[];
                outputFormat: "json";
                status: hono_utils_http_status.StatusCode;
              };
            };
          } & {
            "/account-submissions/:account": {
              $get: {
                input: {
                  param: {
                    account: string;
                  };
                };
                output: (
                  | {
                      type: "time-locked";
                      chainId: `0x${string}`;
                      slot: string;
                      payload: string;
                      timing:
                        | {
                            type: "fixed-time";
                            scheduledTime: number;
                            expiry?: number | undefined;
                            assumedTransaction?:
                              | {
                                  hash: `0x${string}`;
                                  nonce: `0x${string}`;
                                  broadcastTime: number;
                                }
                              | undefined;
                          }
                        | {
                            type: "fixed-round";
                            scheduledRound: number;
                            expectedTime: number;
                            expiry?: number | undefined;
                            assumedTransaction?:
                              | {
                                  hash: `0x${string}`;
                                  nonce: `0x${string}`;
                                  broadcastTime: number;
                                }
                              | undefined;
                          };
                      onBehalf?: `0x${string}` | undefined;
                      paymentReserve?: string | undefined;
                      account: `0x${string}`;
                      broadcasted: boolean;
                      finalized: boolean;
                      checkinTime: number;
                      retries: number;
                      priorTransactionConfirmation?:
                        | {
                            blockTime: number;
                            startTime?: number | undefined;
                          }
                        | undefined;
                      expectedWorstCaseGasPrice?: string | undefined;
                    }
                  | {
                      type: "clear";
                      executions: {
                        chainId: `0x${string}`;
                        derivationParameters: {
                          type: string;
                          data: any;
                        };
                        transaction: {
                          type: "0x2";
                          to?: `0x${string}` | undefined;
                          gas: `0x${string}`;
                          data?: `0x${string}` | undefined;
                          value?: `0x${string}` | undefined;
                          accessList?:
                            | {
                                address: `0x${string}`;
                                storageKeys: [
                                  `0x${string}`,
                                  ...`0x${string}`[]
                                ];
                              }[]
                            | undefined;
                        };
                        maxFeePerGasAuthorized: `0x${string}`;
                        expiryTime?: number | undefined;
                        onBehalf?: `0x${string}` | undefined;
                      }[];
                      chainId: `0x${string}`;
                      slot: string;
                      timing:
                        | {
                            type: "delta-time";
                            startTransaction: {
                              hash: `0x${string}`;
                              nonce: `0x${string}`;
                              broadcastTime: number;
                            };
                            delta: number;
                            expiry?: number | undefined;
                          }
                        | {
                            type: "fixed-time";
                            scheduledTime: number;
                            expiry?: number | undefined;
                            assumedTransaction?:
                              | {
                                  hash: `0x${string}`;
                                  nonce: `0x${string}`;
                                  broadcastTime: number;
                                }
                              | undefined;
                          }
                        | {
                            type: "fixed-round";
                            scheduledRound: number;
                            expectedTime: number;
                            expiry?: number | undefined;
                            assumedTransaction?:
                              | {
                                  hash: `0x${string}`;
                                  nonce: `0x${string}`;
                                  broadcastTime: number;
                                }
                              | undefined;
                          };
                      onBehalf?: `0x${string}` | undefined;
                      paymentReserve?: string | undefined;
                      account: `0x${string}`;
                      broadcasted: boolean;
                      finalized: boolean;
                      checkinTime: number;
                      retries: number;
                      priorTransactionConfirmation?:
                        | {
                            blockTime: number;
                            startTime?: number | undefined;
                          }
                        | undefined;
                      expectedWorstCaseGasPrice?: string | undefined;
                    }
                )[];
                outputFormat: "json";
                status: hono_utils_http_status.StatusCode;
              };
            };
          } & {
            "/executions": {
              $get: {
                input: {};
                output: {
                  chainId: `0x${string}`;
                  account: `0x${string}`;
                  slot: string;
                  batchIndex: number;
                  onBehalf?: `0x${string}` | undefined;
                  derivationParameters: {
                    type: string;
                    data: any;
                  };
                  transaction: {
                    type: "0x2";
                    to?: `0x${string}` | undefined;
                    gas: `0x${string}`;
                    data?: `0x${string}` | undefined;
                    value?: `0x${string}` | undefined;
                    accessList?:
                      | {
                          address: `0x${string}`;
                          storageKeys: [`0x${string}`, ...`0x${string}`[]];
                        }[]
                      | undefined;
                  };
                  transactionParametersUsed: {
                    maxFeePerGas: `0x${string}`;
                    maxPriorityFeePerGas: `0x${string}`;
                    nonce: `0x${string}`;
                    from: `0x${string}`;
                  };
                  initialTime: number;
                  broadcastTime?: number | undefined;
                  nextCheckTime: number;
                  hash: `0x${string}`;
                  maxFeePerGasAuthorized: `0x${string}`;
                  helpedForUpToGasPrice?: `0x${string}` | undefined;
                  isVoidTransaction: boolean;
                  finalized: boolean;
                  retries?: number | undefined;
                  lastError?: string | undefined;
                  expiryTime?: number | undefined;
                  expectedWorstCaseGasPrice?: `0x${string}` | undefined;
                }[];
                outputFormat: "json";
                status: hono_utils_http_status.StatusCode;
              };
            };
          } & {
            "/all-executions": {
              $get: {
                input: {};
                output: {
                  chainId: `0x${string}`;
                  account: `0x${string}`;
                  slot: string;
                  batchIndex: number;
                  onBehalf?: `0x${string}` | undefined;
                  derivationParameters: {
                    type: string;
                    data: any;
                  };
                  transaction: {
                    type: "0x2";
                    to?: `0x${string}` | undefined;
                    gas: `0x${string}`;
                    data?: `0x${string}` | undefined;
                    value?: `0x${string}` | undefined;
                    accessList?:
                      | {
                          address: `0x${string}`;
                          storageKeys: [`0x${string}`, ...`0x${string}`[]];
                        }[]
                      | undefined;
                  };
                  transactionParametersUsed: {
                    maxFeePerGas: `0x${string}`;
                    maxPriorityFeePerGas: `0x${string}`;
                    nonce: `0x${string}`;
                    from: `0x${string}`;
                  };
                  initialTime: number;
                  broadcastTime?: number | undefined;
                  nextCheckTime: number;
                  hash: `0x${string}`;
                  maxFeePerGasAuthorized: `0x${string}`;
                  helpedForUpToGasPrice?: `0x${string}` | undefined;
                  isVoidTransaction: boolean;
                  finalized: boolean;
                  retries?: number | undefined;
                  lastError?: string | undefined;
                  expiryTime?: number | undefined;
                  expectedWorstCaseGasPrice?: `0x${string}` | undefined;
                }[];
                outputFormat: "json";
                status: hono_utils_http_status.StatusCode;
              };
            };
          } & {
            "/test/:message": {
              $get: {
                input: {
                  param: {
                    message: string;
                  };
                };
                output: {
                  message: string;
                };
                outputFormat: "json";
                status: hono_utils_http_status.StatusCode;
              };
            };
          },
          "/"
        >
      | hono_types.MergeSchemaPath<
          {
            "/clear": {
              $get: {
                input: {};
                output: {
                  ok: boolean;
                };
                outputFormat: "json";
                status: hono_utils_http_status.StatusCode;
              };
            };
          } & {
            "/setup": {
              $get: {
                input: {};
                output: {
                  ok: boolean;
                };
                outputFormat: "json";
                status: hono_utils_http_status.StatusCode;
              };
            };
          } & {
            "/expectedGasPrice/:chainId": {
              $get: {
                input: {
                  param: {
                    chainId: string;
                  };
                };
                output: {
                  current: string | undefined;
                  updateTimestamp: number | undefined;
                  previous: string | undefined;
                };
                outputFormat: "json";
                status: hono_utils_http_status.StatusCode;
              };
            };
          } & {
            "/updateExpectedGasPrice/:chainId/:value": {
              $get: {
                input: {
                  param: {
                    chainId: string;
                  } & {
                    value: string;
                  };
                };
                output: {
                  current: string | undefined;
                  updateTimestamp: number | undefined;
                  previous: string | undefined;
                };
                outputFormat: "json";
                status: hono_utils_http_status.StatusCode;
              };
            };
          },
          "/"
        >,
      "/api/admin"
    >
  | hono_types.MergeSchemaPath<
      | hono_types.BlankSchema
      | hono_types.MergeSchemaPath<
          {
            "/queue": {
              $get: {
                input: {};
                output: {};
                outputFormat: string;
                status: hono_utils_http_status.StatusCode;
              };
            };
          } & {
            "/queue-with-payload": {
              $get: {
                input: {};
                output: {};
                outputFormat: string;
                status: hono_utils_http_status.StatusCode;
              };
            };
          } & {
            "/all-submissions": {
              $get: {
                input: {};
                output: {};
                outputFormat: string;
                status: hono_utils_http_status.StatusCode;
              };
            };
          } & {
            "/account-submissions/:account": {
              $get: {
                input: {
                  param: {
                    account: string;
                  };
                };
                output: {};
                outputFormat: string;
                status: hono_utils_http_status.StatusCode;
              };
            };
          } & {
            "/account-archived-submissions/:account": {
              $get: {
                input: {
                  param: {
                    account: string;
                  };
                };
                output: {};
                outputFormat: string;
                status: hono_utils_http_status.StatusCode;
              };
            };
          } & {
            "/executions": {
              $get: {
                input: {};
                output: {};
                outputFormat: string;
                status: hono_utils_http_status.StatusCode;
              };
            };
          } & {
            "/all-executions": {
              $get: {
                input: {};
                output: {};
                outputFormat: string;
                status: hono_utils_http_status.StatusCode;
              };
            };
          },
          "/"
        >
      | hono_types.MergeSchemaPath<hono_types.BlankSchema, "/">,
      "/dashboard/admin"
    >,
  "/"
>;
