interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
  }
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  }
  
  interface Props extends BoxProps {
  
  }
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
  
    //   const getPriority = (blockchain: any): number => {
      const getPriority = (blockchain: string): number => {

        switch (blockchain) {
          case 'Osmosis':
            return 100
          case 'Ethereum':
            return 50
          case 'Arbitrum':
            return 30
          case 'Zilliqa':
            return 20
          case 'Neo':
            return 20
          default:
            return -99
        }
      }
  
    const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            /*--- blockchain does not exist in type WalletBalance. I dont understand the bussiness logic but i see the blockchain property is used multiple times so i decided to add the blockchain property in the WalletBalance interface   ---*/

            // if (lhsPriority > -99) {
            //    if (balance.amount <= 0) {
            //      return true;
            //    }
            // }
           
            // return false
            /*---- balancePriority is unused and lhsPriority is not declared so i think it should be balancePriority in the if statement and combine 2 if statement  -----*/

            return balancePriority > -99 && balance.amount <= 0
          })
          .sort((lhs: WalletBalance, rhs: WalletBalance) => {
            //   const leftPriority = getPriority(lhs.blockchain);
            // const rightPriority = getPriority(rhs.blockchain);
            // if (leftPriority > rightPriority) {
            //   return -1;
            // } else if (rightPriority > leftPriority) {
            //   return 1;
            // }
            /*--- the code can be simplified as belows  ---*/
            return getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      });
    }, [balances, prices]); /*--- the prices is not in the useMemo callback so it should not be put in the dependency ---*/
  
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed()
      }
    })
  
    /*--- sortedBalances should be replaced by formattedBalances ---*/
    // const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }